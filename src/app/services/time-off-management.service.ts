import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { TimeOffRequestService } from "./time-off-request.service";
import { merge, Subject, switchMap } from "rxjs";
import { TimeOffRequest } from "../infrastructure/types/time-off-request.type";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
})
export class TimeOffManagementService {
    private readonly timeOffRequestService = inject(TimeOffRequestService);

    // subjects that will propagate the events of user deleting, approving, and rejecting time-off requests 
    deleteRequest$ = new Subject<TimeOffRequest>();
    approveRequest$ = new Subject<TimeOffRequest>();
    rejectRequest$ = new Subject<TimeOffRequest>();
    selectType = signal<'Vacation' | 'Sick Leave' | 'Maternity Leave' | 'Paternity Leave' | 'Other' | ''>(
        localStorage.getItem('selectedType') as any ?? '');

    // requests signal is derived from events that occur when the user deletes, approves, rejects or changes the selected type
    // each particular event triggers its own HTTP call 
    requests = toSignal(
        merge(
            toObservable(this.selectType),
            this.deleteRequest$.pipe(
                switchMap((r) => this.timeOffRequestService.deleteRequest(r.id))
            ),
            this.approveRequest$.pipe(
                switchMap(r => this.timeOffRequestService.approveRequest(r.id))
            ),
            this.rejectRequest$.pipe(
                switchMap(r => this.timeOffRequestService.rejectRequest(r.id))
            )
        ).pipe(
            // regardless of the what the source observables did, when they are finished, we will refresh the data on the page
            switchMap(() => this.timeOffRequestService.getRequestsByType(this.selectType()))
        ),
        {
            initialValue: [] as TimeOffRequest[]
        }        
    )

    constructor() {
        effect(() => {
            localStorage.setItem('selectedType', this.selectType());
        });
    }

    resolvedRequests = computed(() =>
        this.requests().filter((r) => r.status !== 'Pending')
      );

    approveRequest(request: TimeOffRequest) {
        this.approveRequest$.next(request);
    }

    rejectRequest(request: TimeOffRequest) {
        this.rejectRequest$.next(request);
    }

    deleteRequest(request: TimeOffRequest) {
        this.deleteRequest$.next(request);
    }

}