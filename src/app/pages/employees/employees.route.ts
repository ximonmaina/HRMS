import { Routes } from "@angular/router";
import { CreateEmployeeComponent } from "./create-employee/create-employee.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { employeeDetailsResolver } from "../../shared/resolvers/employee-details.resolvers";
import { employeePermissionsInterceptor } from "../../shared/interceptors/employee-permissions.interceptor";

export const routes: Routes = [
    {
        path: 'list',
        canActivate: [employeePermissionsInterceptor],
        component: EmployeeListComponent},
    {
        path: 'details/:id', 
        component: EmployeeDetailsComponent,
        resolve: {employee: employeeDetailsResolver}
    },
    {path: 'create', component: CreateEmployeeComponent},
    {path: 'edit', component: EditEmployeeComponent},
]