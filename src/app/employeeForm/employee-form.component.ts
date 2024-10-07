import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpService } from '../Shared/emp.service';
import { ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { LoadingComponent } from '../Shared/loading/loading.component';
import { districts, Employee, states } from '../types/type';


@Component({
  selector: 'app-emp-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})


export class EmployeeFormComponent implements OnInit {

  gender = ['Male', 'Female', 'Other']
  internType = ['PartTime', 'FullTime'];
  UID;
  editMode = false;
  empForm: FormGroup;
  isLoading = false;
  states: states;
  district: districts;

  constructor(private empService: EmpService, private router: ActivatedRoute, private toast: NgToastService) { }

  ngOnInit(): void {

    this.router.params.subscribe((data: Params) => {
      this.UID = +data.id
      this.editMode = !!data.id
    })

    // get data from server via UID to bind into forms ....
    if (this.editMode) {
      this.fetchEmployeeData(this.UID)
    }

    this.HandleForm('' as any)
    this.getStates()

  }

  private HandleForm(IndividulEmp: Employee) {
    let name = '';
    let email = '';
    let phone: number;
    let state = '';
    let district = '';
    let dob = '';
    let joining_date = '';
    let intern_type = '';
    let gender = '';

    if (this.editMode) {
      name = IndividulEmp.Name;
      email = IndividulEmp.Email;
      phone = IndividulEmp.Phone;
      state = IndividulEmp.State;
      district = IndividulEmp.District;
      dob = IndividulEmp.Dob;
      joining_date = IndividulEmp.Joining_Date;
      intern_type = IndividulEmp.Intern_Type;
      gender = IndividulEmp.Gender;
    }

    this.empForm = new FormGroup({
      'Name': new FormControl(name, Validators.required),
      'Email': new FormControl(email, [Validators.required, Validators.email]),
      'Phone': new FormControl(phone, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)]),
      'State': new FormControl(state, Validators.required),
      'District': new FormControl(district, Validators.required),
      'Dob': new FormControl(dob, Validators.required),
      'Joining_Date': new FormControl(joining_date, Validators.required),
      'Intern_Type': new FormControl(intern_type, Validators.required),
      'Gender': new FormControl(gender, Validators.required),
    })
  }



  onSubmit() {

    this.isLoading = true; //Hiding button on submit
    let obser: Observable<any>;

    if (this.editMode) {
      const UID = this.UID
      obser = this.empService.onUpdate(UID, this.empForm.value)
    }
    else {
      obser = this.empService.onSubmit(this.empForm.value)
    }

    obser.subscribe({
      next: (res) => {

        this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 3000, position: 'topCenter' });

        if (this.editMode) {
          this.editMode = false;
        }
        this.empForm.reset()
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.error({ detail: "ERROR", summary: err.message, duration: 3000, position: 'topCenter' });
      },

      complete: () => {
        this.isLoading = false;
      }

    }
    )
  }


  onReset() {
    this.editMode = false;
    this.empForm.reset();
  }


  getStates() {

    this.empService.States

      .subscribe({

        next: async ({ States }) => {

          this.states = await States;

          this.getDistrict()

        },

        error: ({ message }) => {

          this.toast.error({ detail: "ERROR", summary: message, duration: 2000 })

        }
      })

  }


  getDistrict() {

    const stateId = this.empForm.value.State

    if (this.empForm.get('State').valid) {

      this.empService.getDistrict(stateId).subscribe({

        next: ({ Districts }) => {
          this.district = Districts
        },

        error: ({ message }) => {
          this.toast.error({ detail: "ERROR", summary: message, duration: 2000 })
        }
      },
      )
    }
  }


  fetchEmployeeData(UID) {

    this.empService.getEmployeeDetails(UID).subscribe({

      next: ({ details }) => {
        this.HandleForm(details)
      },

      error: ({ message }) => {
        this.toast.error({ detail: "ERROR", summary: message, duration: 2000 })
      }

    })
  }
}
