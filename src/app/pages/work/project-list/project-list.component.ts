import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { ProjectCardComponent } from "../../../shared/components/project-card/project-card.component";

@Component({
  selector: 'app-project-list',
  imports: [NgFor, ProjectCardComponent, AsyncPipe],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
    private readonly projectService = inject(ProjectService);
    projects$ = this.projectService.getProjects();
}
