import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { map } from "rxjs";

/**
 * Old AuthGuard implementation
 */
// @Injectable()
// export class AuthGaurd implements CanActivate {
//     authService = inject(AuthService);
//     router = inject(Router);

//     canActivate(): Observable<boolean | UrlTree> {
//         return this.authService.isAuth$.pipe(
//             map((isAuth) => isAuth || this.router.createUrlTree(['/login']))
//         );
//     }
// }

/**
 * 
    The guard is not just a function that must implement the CanActivateFn interface, which acts like the CanActivate 
    interface
 */
export const authGaurd: CanActivateFn = () => {
        const router = inject(Router);
        const authService = inject(AuthService);

        return authService.isAuth$.pipe(
            map((isAuth) => isAuth || router.createUrlTree(['/login']))
        );
}