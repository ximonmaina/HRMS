import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../infrastructure/types/project';
import { ProjectService } from '../../../services/project.service';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-project-card',
  imports: [NgIf, AsyncPipe, NgOptimizedImage],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent implements OnChanges {
  private readonly projectService = inject(ProjectService);
  
  @Input({required: true}) projectId!: number;
  project$: Observable<Project> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['projectId']) {
      this.project$ = this.projectService.getProject(this.projectId);
    }
  }

}
