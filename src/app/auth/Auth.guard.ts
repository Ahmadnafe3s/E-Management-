import { Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { SessionService } from "./session.service";

@Injectable({
  providedIn: 'root'
})


export class AuthGuard {

  constructor(private session: SessionService, private router: Router) { }

  canActivate: CanActivateFn = (route, state) => {
    const session = this.session.userSession();

    // If no session, redirect to login page
    if (!session) {
      return this.router.parseUrl('/Auth/logIn'); 
    }

    // If authenticated, allow access
    return true;
  }

}
