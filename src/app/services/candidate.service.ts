import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Candidate } from "../infrastructure/types/candidate";
import { Observable } from "rxjs";

@Injectable()
export class CandidateService {
    private readonly http = inject(HttpClient);

    getCandidates(): Observable<Candidate[]> {
        return this.http.get<Candidate[]>('/candidates');
    }

    getCandidatesByName(name: string) {
        return this.http.get<Candidate[]>(`/candidates?firstName_like=${name}`);
    }

    getCandidate(id: number) {
        return this.http.get<Candidate>(`/candidates/${id}`);
    }
}