import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Employee } from "../../infrastructure/types/employee";
import { EmployeeService } from "../../services/employee.service";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export const employeeDetailsResolver: ResolveFn<Employee> = ( // The ResolverFn interface receives a type arg which explains the type of data to return
    route: ActivatedRouteSnapshot // current route information
) => {
    const employeeService = inject(EmployeeService);
    const id = +(route.paramMap.get('id') ?? 0); // take id param from route and convert to number

    return employeeService.getEmployee(id) as Observable<Employee>;

}