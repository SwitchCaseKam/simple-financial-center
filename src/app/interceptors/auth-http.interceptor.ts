import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AuthHttpInterceptor implements HttpInterceptor {

    private apiHost = 'alpha-vantage.p.rapidapi.com';
    private apiKey = 'X';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes(this.apiHost)) {
            const modifiedReq = req.clone({ 
                headers: req.headers.set('X-Rapidapi-Host', this.apiHost).set('X-Rapidapi-Key', this.apiKey),
                });
                return next.handle(modifiedReq);
        }
        return next.handle(req);

    }
}