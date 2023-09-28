import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpService } from '../Shared/emp.service';

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
  empForm: FormGroup;

  constructor(private empService: EmpService) {
  }

  ngOnInit(): void {
    this.HandleForm()
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


    this.empForm = new FormGroup({
      'Name': new FormControl(name, Validators.required),
      'Email': new FormControl(email, [Validators.required ,Validators.email]),
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
    this.empService.onSave(this.empForm.value)
  }

}
