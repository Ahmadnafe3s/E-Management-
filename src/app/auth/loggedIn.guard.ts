import { Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { SessionService } from "./session.service";

@Injectable({
    providedIn: 'root'
})


export class loggedInGuard {

    constructor(private session: SessionService, private router: Router) { }

    canActivate: CanActivateFn = (route, state) => {

        const Session = this.session.userSession()

        if (Session) {
            return this.router.parseUrl('/')
        }

        return true
    }

}