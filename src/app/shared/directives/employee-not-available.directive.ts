import { NgClass } from "@angular/common";
import { AfterViewInit, Directive, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { EmployeeService } from "../../services/employee.service";
import { TooltipDirective } from "./tootltip.directive";

@Directive({
    selector: 'a[routerLink]',
    hostDirectives: [NgClass, {directive: TooltipDirective, inputs: ['tooltip']}],
    standalone: true
})
export class EmployeeNotAvailableDirective implements AfterViewInit {
    private readonly ngClassRef = inject(NgClass);
    private readonly routerLinkRef = inject(RouterLink);
    private readonly employeeService = inject(EmployeeService);
    private readonly tooltipRef = inject(TooltipDirective);

    ngAfterViewInit(): void {
        if(this.routerLinkRef.href!.startsWith('/employee/details')){
            // get the id of the employee from the route path
            const employeeId = this.routerLinkRef.urlTree?.root.children['primary']?.segments.at(-1)?.path;

            if(employeeId) {
                this.employeeService.getEmployee(+employeeId).subscribe(employee => {
                    this.ngClassRef.ngClass = {
                        'not-available': !employee.isAvailable
                    }
                    // assign tooltip when status is un-available
                    this.tooltipRef.tooltip = employee.isAvailable ? '': 'Employee is not available';
                });
            }
        }
    }

}