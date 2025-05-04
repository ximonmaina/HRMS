import { AsyncPipe, NgComponentOutlet, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { TruncateDirective } from '../../../shared/directives/truncate.directive';

@Component({
  selector: 'app-employee-list',
  imports: [AsyncPipe, NgFor, NgComponentOutlet, TruncateDirective],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',

})
export class EmployeeListComponent {
  private readonly employeeService = inject(EmployeeService);
  employees$ = this.employeeService.getEmployees();
  isConfirmationOpen = false;
  confirmDialog: any = null;

  async showConfirmationDialog() {
    this.confirmDialog = await import('../../../shared/components/confirmation-dialog/confirmation-dialog.component').then(
      (m) => m.ConfirmationDialogComponent);
    this.isConfirmationOpen = true;
  }

}
