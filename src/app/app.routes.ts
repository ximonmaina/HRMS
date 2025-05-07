import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { EmployeeService } from './services/employee.service';
import { authGaurd } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'registration',
    loadComponent: () => {
      // lazy loading components
      return import('./pages/registration.component').then(
        (m) => m.RegistrationComponent
      );
    },
  },
  {
    path: 'employees',
    canActivate: [authGaurd],
    providers: [EmployeeService], // only available to these routes
    loadChildren: () => {
      // lazy loading several standalone components
      return import('./pages/employees/employees.route').then((m) => m.routes);
    },
  },
  {
    path: 'work',
    canActivate: [authGaurd],
    loadChildren: () => {
        return import('./pages/work/work.route').then((m) => m.routes);
    }
  },
];
