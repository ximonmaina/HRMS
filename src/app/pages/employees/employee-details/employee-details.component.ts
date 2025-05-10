import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../infrastructure/types/employee';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  imports: [NgOptimizedImage],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  employee = inject(ActivatedRoute).snapshot.data['employee'] as Employee;
}
