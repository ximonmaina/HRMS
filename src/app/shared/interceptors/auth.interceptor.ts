import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>, // receives the current request as a parameter, which we can use to modify
    next: HttpHandlerFn, // passes the request to the next handler in the pipeline 
) => {
    const authService = inject(AuthService);
    const token = authService.getToken();
    const newReq = req.clone({setHeaders: {
        'Authorization': `Bearer ${token}`
    }});

    return next(newReq); // pass the new, modified request to the next handler
}