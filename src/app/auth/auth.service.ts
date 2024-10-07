import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.development";
import { logInResponse, signUpResponse } from "../types/type";
import { SessionService } from "./session.service";


@Injectable({
    providedIn: 'root'
})


export class AuthService {

    // importing  dependency

    constructor(private http: HttpClient, private router: Router, private userSession: SessionService, private session: SessionService) { }

    signUp(formValue) {
        return this.http.post<signUpResponse>(`${environment.API + '/signUp'}`, formValue).pipe(catchError(this.handleErr))
    }


    logIn(formValue) {

        console.log(environment.API);
        

        return this.http.post<logInResponse>(`${environment.API + '/logIn'}`, formValue).pipe(catchError(this.handleErr), tap(res => {

            document.cookie = `user=${JSON.stringify({ Name: res.Name, Email: res.Email })}; max-age=${60 * 60 * res.ExpiresIn};  path=/; secure; SameSite=Lax`;
            document.cookie = `auth_token=${JSON.stringify(res.Token)}; max-age=${60 * 60 * res.ExpiresIn}; path=/; secure; SameSite=Lax`;

            this.session.user.next(this.session.userSession())

        }))

    }


    // for veryfing user (already exist or avaliable)

    checkUser(email) {
        return this.http.post<{ message: string | null, demo: string }>(`${environment.API + '/checkUser'}`, { Email: email })
    }



    validateEmail(email: string) {
        return this.http.post<{ message: string, expiresIn: number, secretKey: string }>(`${environment.API + '/verifyEmail'}`, { Email: email }).pipe(catchError(this.handleErr))
    }

    otpValidation(otp: number, secret: string) {
        return this.http.post<{ message: string }>(`${environment.API + '/verifyOtp'}`, { Otp: otp, secretKey: secret }).pipe(catchError(this.handleErr))
    }

    updatePassword(Email: string, Password: string) {
        return this.http.post<{ message: string }>(`${environment.API + '/updatePassword'}`, { Email, Password }).pipe(catchError(this.handleErr))
    }


    handleErr(err: HttpErrorResponse) {
        let message = null;
        if (!err || !err.error) {
            message = 'No Internet Connection'
        }
        else {
            message = err.error.message
        }
        return throwError(() => {
            throw new Error(message)
        })
    }


    onLogOut() {
        this.session.removeSession()
        this.session.user.next(null)
    }

}