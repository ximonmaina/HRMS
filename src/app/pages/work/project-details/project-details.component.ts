import { Component, inject, Input, numberAttribute, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProjectCardComponent } from "../../../shared/components/project-card/project-card.component";
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Project } from '../../../infrastructure/types/project';

@Component({
  selector: 'app-project-details',
  imports: [ProjectCardComponent, NgIf, NgFor, AsyncPipe],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnChanges {
  @Input({transform: numberAttribute}) id!: number;
  private readonly projectService = inject(ProjectService);
  project$: Observable<Project> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['id']){
      this.project$ = this.projectService.getProject(this.id)
    }
  }



}
