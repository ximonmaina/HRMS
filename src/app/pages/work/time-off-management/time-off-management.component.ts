import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { TimeOffRequest } from '../../../infrastructure/types/time-off-request.type';
import { FormsModule } from '@angular/forms';
import { TimeOffRequestService } from '../../../services/time-off-request.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-time-off-management',
  imports: [NgIf, NgFor, DatePipe, FormsModule],
  templateUrl: './time-off-management.component.html',
  styleUrl: './time-off-management.component.css'
})
export class TimeOffManagementComponent {
    private readonly timeOffRequestService = inject(TimeOffRequestService);
    injector = inject(Injector);

    requests = toSignal(this.timeOffRequestService.getRequests(), {initialValue: []});

  // to use the value previously selected by the user we can adjust the default value
  selectedType = signal<
                'Vacation' | 'Sick Leave' | 'Maternity Leave' |
                'Paternity Leave' | 'Other' | ''>(localStorage.getItem('selectedType') as any ?? '');

  filteredRequests = computed(() => {
    const type = this.selectedType();
    return this.requests().filter(r => type ? r.type === type: true);
  });

  resolvedRequests = computed(() => this.filteredRequests().filter((r => r.status !== 'Pending')));

  constructor() {
    effect(() => {
      localStorage.setItem('selectedType', this.selectedType());
    });
  }

  approveRequest(request: TimeOffRequest) {
    // this.requests.update((requests) => {
    //   const index = requests.findIndex((r) => r.id === request.id);
    //   return requests.map(
    //     (item, i) => i === index ? ({
    //       ...item,
    //       status: 'Approved'
    //     }) : item);
    // });   
  }

  rejectRequest(request: TimeOffRequest) {
    // this.requests.update((requests) => {
    //   const index = requests.findIndex(x => x.id === request.id);
    //   return requests.map(
    //     (item, i) => i === index ? {...item, status: 'Rejected'} : item
    //   )
    // });
  }

  deleteRequest(request: TimeOffRequest) {
   this.requests = toSignal(
    this.timeOffRequestService.rejectRequest(request.id).pipe(
      switchMap(() => this.timeOffRequestService.getRequests())
    ),
    {initialValue: this.requests(), injector: this.injector}
  )
  }

  
}
