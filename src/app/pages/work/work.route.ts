import { Route } from "@angular/router";
import { ProjectDetailsComponent } from "./project-details/project-details.component";

export const routes: Route[] = [
    {path: 'projects/:id', component: ProjectDetailsComponent}
]