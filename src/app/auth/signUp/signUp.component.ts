import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgToastComponent, NgToastService } from "ng-angular-popup";

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule, CommonModule],
    selector: 'app-signUp',
    templateUrl: './signUp.component.html',
    styleUrls: ['./signUp.component.css']
})


export class signUpcomponent implements OnInit {

    signUpForm: FormGroup; // just define type
    isUser: string | null = 'avaliable'
    emailVerificationError: string | null = null;


    constructor(private authService: AuthService, private toast: NgToastService, private router: Router) { }

    ngOnInit(): void {
        this.Handleform();
    }


    private Handleform() {
        this.signUpForm = new FormGroup({
            'Name': new FormControl('', Validators.required),
            'Email': new FormControl('', [Validators.email, Validators.required]),
            'Password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
        })
    }


    verifyEmail() {

        const Email = this.signUpForm.get('Email').value

        this.authService.checkUser(Email).subscribe({

            next: ({ message }) => { // extracting from stream
                this.isUser = message
                this.emailVerificationError = null;
            },

            error: ({ error }) => {
                this.emailVerificationError = error.message;
                this.isUser = null;
            }
        })

    }


    onSubmit() {

        this.authService.signUp(this.signUpForm.value).subscribe({

            next: ({ message }) => {

                this.toast.success({
                    summary: message as any, position: 'topCenter', duration: 2000,
                    detail: "Success"
                })

                this.router.navigate(['/Auth/logIn'])

            },

            error: ({message}) => { // directly extracting data

                this.toast.error({
                    summary: message, position: 'topCenter', duration: 2000,
                    detail: "Error"
                })
            }

        })

    }
}