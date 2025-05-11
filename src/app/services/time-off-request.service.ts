import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TimeOffRequest } from "../infrastructure/types/time-off-request.type";
import { map } from "rxjs";

@Injectable()
export class TimeOffRequestService {
    private readonly http = inject(HttpClient);

    getRequests(query = '') {
        return this.http.get<TimeOffRequest[]>('/time-off-requests');
    }

    getRequestsByType(query = '') {
        return this.http.get<TimeOffRequest[]>('/time-off-requests').pipe(
            map((requests) => {
                return query === '' ? requests : requests.filter(x => x.type === query);
            })
        )
    }

    rejectRequest(id: number) {
        return this.http.patch(`/time-off-requests/${id}`, {status: 'Rejected'});
    }
}