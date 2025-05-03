import { AsyncPipe, NgComponentOutlet, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  imports: [AsyncPipe, NgFor, NgIf, NgComponentOutlet],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: any;
  isConfirmationOpen = false;
  confirmDialog: any = null;

  constructor(private readonly employeeService: EmployeeService){
    this.employees$ = this.employeeService.getEmployees();
  }

  async showConfirmationDialog() {
    this.confirmDialog = await import('../../../shared/components/confirmation-dialog/confirmation-dialog.component').then(
      (m) => m.ConfirmationDialogComponent);
    this.isConfirmationOpen = true;
  }

}
