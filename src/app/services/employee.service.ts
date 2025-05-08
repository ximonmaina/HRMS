import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '../infrastructure/types/employee';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService {

  private readonly http = inject(HttpClient);

  getEmployees(id?: number | 0):Observable<Employee[]> {
    return this.http.get<Employee[]>('/api/employees');
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`/api/employees/${id}`);
  }

  createEmployee(employee: Omit<Employee, 'id' | 'isAvailable'>) {
    return this.http.post('/employees', employee);
  }

}
