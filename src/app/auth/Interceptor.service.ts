import { HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.UserSubject.pipe(take(1), exhaustMap(
            user => {
                if (!user) {
                    return next.handle(req)
                }
                else {
                    let modified = req.clone({ headers: new HttpHeaders().set('token', user.Token) })
                    return next.handle(modified)
                }
            }))

    }
}