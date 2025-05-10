import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PermissionService } from '../../../services/permissions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeForm } from '../../../infrastructure/types/employee-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-employee',
  imports: [],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css',
})
export class EditEmployeeComponent implements OnInit {
  permissionService = inject(PermissionService);
  destroyRef = inject(DestroyRef);
  form = new FormGroup<EmployeeForm>({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    position: new FormControl('', { nonNullable: true }),
    level: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.permissionService
      .hasPermission('EditEmployeeGeneralDetails')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((hasPermission) => {
        if (!hasPermission) {
          this.form.controls.firstName.disable();
          this.form.controls.lastName.disable();
          this.form.controls.email.disable();
        } else {
          this.form.controls.firstName.enable();
          this.form.controls.lastName.enable();
          this.form.controls.email.enable();
        }
      });
  }
}
