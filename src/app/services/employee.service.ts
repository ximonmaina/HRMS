import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getEmployees() {
    return this.httpClient.get('/api/employees');
  }
}
