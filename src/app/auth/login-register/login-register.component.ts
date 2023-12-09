import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  SignMode = false; // false === signUp Mode
  isUser: boolean = false; // checking that user already exist..
  Authentication: FormGroup;

  constructor(private authService: AuthService, private toast: NgToastService, private router: Router) { }

  ngOnInit(): void {
    this.Handleform()
  }

  private Handleform() {
    this.Authentication = new FormGroup({
      'Name': new FormControl('', Validators.required),
      'Email': new FormControl('', [Validators.email, Validators.required]),
      'Password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)])
    })
  }


  onSubmit() {
    let Observ: Observable<any>

    if (this.SignMode) {
      Observ = this.authService.logIn(this.Authentication.value)
    }
    else {
      Observ = this.authService.signUp(this.Authentication.value)
    }

    Observ.subscribe(res => {
      this.router.navigate(['/E-Table'])
      this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 3000, position: 'topCenter' });
    },

      err => {
        this.toast.error({ detail: "ERROR", summary: err, duration: 3000, position: 'topCenter' });
      }
    )
  }


  checkUser() {
    if (!this.SignMode) {
      this.authService.checkUser(this.Authentication.value.Email)
        .subscribe(res => {
          this.isUser = !!res.message;
        })
    }
  }

  Mode() {
    this.isUser = !this.isUser;
    this.SignMode = !this.SignMode;
    if (this.SignMode) {
      this.Authentication.get("Name").disable()
    } else {
      this.Authentication.get("Name").enable()
    }
  }
}
