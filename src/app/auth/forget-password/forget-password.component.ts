import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgToastService } from 'ng-angular-popup';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { Router } from '@angular/router';

enum field {
  Email,
  OTP,
  New_Password
}


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  fpForm: FormGroup;
  Step: number = field.Email; // 0 
  isLoading: boolean = false;
  expiresIn: number;
  Resend: boolean = false;
  constructor(private authService: AuthService, private toast: NgToastService, private router: Router) { }

  ngOnInit(): void {
    this.handleForm()
  }


  private handleForm() {
    this.fpForm = new FormGroup({
      'Email': new FormControl('', [Validators.required, Validators.email]),
      'Otp': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(6), Validators.minLength(6)]),
      'New-Password': new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(8)]),
      'Confirm-Password': new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(8)]),
    })
  }


  validateEmail() {
    this.isLoading = true
    let email = this.fpForm.get('Email').value
    this.authService.validateEmail(email).subscribe(
      res => {
        this.OTP_validation()
        this.isLoading = false;
        localStorage.setItem('validated_Email_res', JSON.stringify(res))
        this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 3000, position: 'topCenter' });
        this.Step = field.OTP;
      },

      err => {
        this.isLoading = false;
        this.toast.error({ detail: "ERROR", summary: err, duration: 3000, position: 'topCenter' });
      })
  }



  verifyOtp() {
    this.isLoading = true
    let otp = this.fpForm.get('Otp').value
    let secretKey = JSON.parse(localStorage.getItem('validated_Email_res')).secretKey

    this.authService.otpValidation(otp, secretKey).subscribe(res => {
      this.isLoading = false
      this.Step = field.New_Password;
      this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 3000, position: 'topCenter' });
    },
      err => {
        this.isLoading = false
        this.toast.error({ detail: "ERROR", summary: err, duration: 3000, position: 'topCenter' });
      }
    )
  }



  updatePassword() {
    this.isLoading = true
    const email = JSON.parse(localStorage.getItem('validated_Email_res')).email
    let newPassword = this.fpForm.get('New-Password').value

    if (this.fpForm.get('New-Password').value === this.fpForm.get('Confirm-Password').value) {
      this.authService.updatePassword(email, newPassword).subscribe(res => {
        this.isLoading = false
        localStorage.removeItem('validated_Email_res')
        this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 3000, position: 'topCenter' });
        this.router.navigate(['/Auth'])
      },
        err => {
          this.isLoading = false
          this.toast.error({ detail: "ERROR", summary: err, duration: 3000, position: 'topCenter' });
        }
      )
    } else {
      this.toast.error({ detail: "ERROR", summary: 'Password did not Match!', duration: 3000, position: 'topCenter' });
    }

  }


  OTP_validation() {
    this.expiresIn = 1;
    this.Resend = false
    let remIntervel = setInterval(() => {
      this.expiresIn++
      if (this.expiresIn === 60) {
        this.Resend = true
        clearInterval(remIntervel)
      }
    }, 1000)
  }

  onResend() {
    this.Resend = false
    this.validateEmail()
  }
}
