import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { hasPermissions } from "../operators/has-permission.operator";

export const employeePermissionsInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
) => {
    return next(req).pipe(
        hasPermissions(['CreateEmployee', 'DeleteEmployee', 'EditEmployeeGeneralDetails', 'ViewEmployees'])
    );
}