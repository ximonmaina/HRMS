import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { EmployeeService } from './services/employee.service';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registration', loadComponent: () => {
        return import('./pages/registration.component').then(
            (m) => m.RegistrationComponent
        );
    }},
    {path: 'employees',
     providers: [EmployeeService], // only available to these routes
     loadChildren: () => {
        return import('./pages/employees/employees.route').then(
            (m) => m.routes
        );
    }},
];
