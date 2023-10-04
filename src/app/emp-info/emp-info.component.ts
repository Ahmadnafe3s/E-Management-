import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpService } from '../Shared/emp.service';
import { ActivatedRoute, Params } from '@angular/router';
import { EmpModel } from './emp.model';

@Component({
  selector: 'app-emp-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emp-info.component.html',
  styleUrls: ['./emp-info.component.css']
})
export class EmpInfoComponent implements OnInit {
  gender = ['Male', 'Female', 'Other']
  internType = ['PartTime', 'FullTime']
  IndividulEmp: EmpModel;
  index;
  editMode = false;
  empForm: FormGroup;

  constructor(private empService: EmpService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.params.subscribe((data: Params) => {
      this.index = +data.id
      this.editMode = !!data.id
      this.IndividulEmp = this.empService.empData[this.index];
      this.HandleForm()
    })
    console.log(this.index, this.editMode);



    //Getting Copy Of the Array of objects



  }


  private HandleForm() {
    let name = '';
    let email = '';
    let phone = '';
    let state = '';
    let district = '';
    let dob = '';
    let joining_date = '';
    let intern_type = '';
    let gender = '';

    if (this.editMode) {
      name = this.IndividulEmp.Name;
      email = this.IndividulEmp.Email;
      phone = this.IndividulEmp.Phone.toString();
      state = this.IndividulEmp.State;
      district = this.IndividulEmp.District;
      dob = this.IndividulEmp.Dob;
      joining_date = this.IndividulEmp.Joining_Date;
      intern_type = this.IndividulEmp.Intern_Type;
      gender = this.IndividulEmp.Gender;
    }

    this.empForm = new FormGroup({
      'Name': new FormControl(name, Validators.required),
      'Email': new FormControl(email, [Validators.required, Validators.email]),
      'Phone': new FormControl(phone, Validators.required),
      'State': new FormControl(state, Validators.required),
      'District': new FormControl(district, Validators.required),
      'Dob': new FormControl(dob, Validators.required),
      'Joining_Date': new FormControl(joining_date, Validators.required),
      'Intern_Type': new FormControl(intern_type, Validators.required),
      'Gender': new FormControl(gender, Validators.required),
    })
  }


  onSubmit() {
    if (this.editMode) 
    {
      let UID = this.IndividulEmp.UID
      this.empService.onUpdate(UID, this.empForm.value)
    }
     else 
     {
      this.empService.onSave(this.empForm.value)
    }

    this.editMode = false;
    this.empForm.reset()
  }

  onReset() {
    this.editMode = false;
    this.empForm.reset();
  }

}
