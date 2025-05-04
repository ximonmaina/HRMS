import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";

@Injectable()
export class AuthService {
    private readonly http = inject(HttpClient);
    isAuth$ = new BehaviorSubject(false);

    login(credentials: {email: string, password: string}) {
        return this.http.post('/api/auth/login', credentials).pipe(
            tap(() => this.isAuth$.next(true))
        );
    }
    
    logout() {
        return this.http.post('/api/auth/logout', {}).pipe(
            tap(() => this.isAuth$.next(false))
        );
    }

    getToken(): string {
        return localStorage.getItem('sessionToken') ?? '';
    }
}
