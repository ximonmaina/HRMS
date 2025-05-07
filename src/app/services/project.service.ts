import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Project } from "../infrastructure/types/project";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ProjectService {

    http = inject(HttpClient);

    getProject(id: number): Observable<Project> {
        return this.http.get<Project>(`/projects/${id}`);
    }

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>('/projects');
    }

    getProjectsByEmployeeId(employeeId: number): Observable<Project[]> {
        return this.http.get<Project[]>(`/projects?employee_like=${employeeId}`);
    }


}