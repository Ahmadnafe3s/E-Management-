import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable, map, take } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class canActivateGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.UserSubject.pipe(take(1), map(user => {
            if (!user) {
                return this.router.createUrlTree(['/Auth'])
            } else {
                return true
            }
        }))
    }
}