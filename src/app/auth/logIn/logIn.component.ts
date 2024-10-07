import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.css']
})



export class logInComponent implements OnInit {


  logInform: FormGroup;


  constructor(private authService: AuthService, private toast: NgToastService, private router: Router) { }



  ngOnInit(): void {
    this.Handleform()
  }



  private Handleform() {
    this.logInform = new FormGroup({
      'Email': new FormControl('', [Validators.email, Validators.required]),
      'Password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)])
    })
  }




  onSubmit() {

    console.log('eorking');
    

    this.authService.logIn(this.logInform.value).subscribe({

      next: res => {
        this.toast.success({
          summary: 'user logIn successfully', position: 'topCenter', duration: 2000,
          detail: "Success"
        })

        this.router.navigate(['/E-Table'])
      },

      error: ({ message }) => {

        this.toast.error({
          summary: message, position: 'topCenter', duration: 2000,
          detail: "Error"
        })

      }

    })

  }



}
