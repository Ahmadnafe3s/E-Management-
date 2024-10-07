import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { userSessionType } from "../types/type";

@Injectable({
    providedIn: 'root'
})


export class SessionService {

    user = new BehaviorSubject<userSessionType | null>(null)

    
    userSession() {

        const USER = document.cookie.split(';')[0]?.replace('user=', '')

        if (USER) {
            return JSON.parse(USER)
        }

        return null
    }



    Token() {

        const Token = document.cookie.split(';')[1]?.replace('auth_token=', '');

        if (Token) {
            return JSON.parse(Token)
        }

        return null
    }



    removeSession() {
        document.cookie = "user='';max-age=0; path=/; SameSite=Lax"
        document.cookie = "auth_token='';max-age=0; path=/; SameSite=Lax"
    }

}