import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { TimeOffRequest } from '../../../infrastructure/types/time-off-request.type';
import { FormsModule } from '@angular/forms';
import { TimeOffRequestService } from '../../../services/time-off-request.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TimeOffManagementService } from '../../../services/time-off-management.service';

@Component({
  selector: 'app-time-off-management',
  imports: [NgIf, NgFor, DatePipe, FormsModule],
  templateUrl: './time-off-management.component.html',
  styleUrl: './time-off-management.component.css'
})
export class TimeOffManagementComponent {
    private readonly timeOffRequestService = inject(TimeOffManagementService);   

    requests = this.timeOffRequestService.requests; 

    resolvedRequests = this.timeOffRequestService.resolvedRequests;
    selectedType = this.timeOffRequestService.selectType;

    approveRequest(request: TimeOffRequest) {
     this.timeOffRequestService.approveRequest(request);
    }

    rejectRequest(request: TimeOffRequest) {
      this.timeOffRequestService.rejectRequest(request);
    }

    deleteRequest(request: TimeOffRequest) {
      this.timeOffRequestService.deleteRequest(request);
    }

  
}
