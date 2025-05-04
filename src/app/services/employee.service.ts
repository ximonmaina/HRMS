import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../infrastructure/types/employee';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getEmployees(id?: number | 0):Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('/api/employees');
  }

  getEmployee(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`/api/employees/${id}`);
  }

}
