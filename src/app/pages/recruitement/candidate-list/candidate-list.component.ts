import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CandidateService } from '../../../services/candidate.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { createSearch } from '../../../shared/functions/create-search';

@Component({
  selector: 'app-candidate-list',
  imports: [ReactiveFormsModule],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css'
})
export class CandidateListComponent implements OnInit{
  private readonly candidateService = inject(CandidateService);
  candidate$ = this.candidateService.getCandidates();

  searchControl = new FormControl('');
  destroy$ = new Subject<void>();
  search$ = createSearch(this.searchControl);

  ngOnInit(): void {
    this.search$.subscribe(value => {
      if(value) {
        this.candidate$ = this.candidateService.getCandidatesByName(value);
      }else {
        this.candidate$ = this.candidateService.getCandidates();
      }
    });
  }

}
