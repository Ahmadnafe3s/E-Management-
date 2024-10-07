import { HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionService } from "./session.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private session: SessionService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const Token = this.session?.Token() // is a method inside sessionService

        if (!Token) {
            return next.handle(req)
        }
        else {
            const modified = req.clone({ headers: new HttpHeaders().set('token', Token) })
            return next.handle(modified)
        }

    }
}