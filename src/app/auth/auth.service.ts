import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { user } from "./user.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})


export class AuthService {
    UserSubject = new BehaviorSubject<null | user>(null)
    constructor(private http: HttpClient, private router: Router) { }

    signUp(formValue) {
        return this.http.post<user>('http://localhost:3000/Register', formValue).pipe(catchError(this.handleErr), tap(res => {
            let expireIn = new Date().getTime() + res.ExpireIn * 1000
            this.UserData(res.Name, res.Token, expireIn)
        }))
    }


    logIn(formValue) {
        return this.http.post<user>('http://localhost:3000/logIn', formValue).pipe(catchError(this.handleErr), tap(res => {
            let expireIn = new Date().getTime() + res.ExpireIn * 1000
            this.UserData(res.Name, res.Token, expireIn)
        }))
    }

    checkUser(email) {
        return this.http.post<{ message: string | null , demo : string}>('http://localhost:3000/checkUser', { Email: email })
    }


    UserData(name: string, token: string, expireIn: number) {
        let User = new user(name, token, expireIn)
        this.UserSubject.next(User)
        localStorage.setItem('user', JSON.stringify(User));
    }

    autoLogIn() {
        let User: { Name: string, _token: string, ExpireIn: number } = JSON.parse(localStorage.getItem('user'))
        if (!User) {
            return
        }

        let loadeduser = new user(User.Name, User._token, User.ExpireIn)
        if (loadeduser.Token) {
            this.UserSubject.next(loadeduser)
        }
    }

    onLogOut() {
        localStorage.removeItem('user')
        this.UserSubject.next(null)
        this.router.navigate(['/Auth'])
    }



    validateEmail(email: string) {
        return this.http.post<{ message: string, expiresIn: number, secretKey: string }>('http://localhost:3000/validateEmail', { Email: email }).pipe(catchError(this.handleErr))
    }

    otpValidation(otp: number, secret: string) {
        return this.http.post<{ message: string }>('http://localhost:3000/verifyOtp', { Otp: otp, secretKey: secret }).pipe(catchError(this.handleErr))
    }

    updatePassword(Email: string, newPassword: string) {
        return this.http.post<{ message: string }>('http://localhost:3000/updatePassword', { email: Email, newPassword: newPassword }).pipe(catchError(this.handleErr))
    }
    
    handleErr(err: HttpErrorResponse) {
        let message = null;
        if (!err.error.error || !err.error) {
            message = 'No Internet Connection'
        }
        else {
            message = err.error.error.message
        }
        return throwError(message)
    }
}