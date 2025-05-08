import { NgComponentOutlet } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, Type } from '@angular/core';
import { Candidate } from '../../../infrastructure/types/candidate';
import { CvEvaluationComponent } from '../components/cv-evaluation/cv-evaluation.component';
import { InterviewPreparationComponent } from '../components/interview-preparation/interview-preparation.component';
import { InterviewFeedbackComponent } from '../components/interview-feedback/interview-feedback.component';
import { RejectionLetterComponent } from '../components/rejection-letter/rejection-letter.component';
import { OnboardingPreparationComponent } from '../components/onboarding-preparation/onboarding-preparation.component';
import { CandidateFinalizationComponent } from '../components/candidate-finalization/candidate-finalization.component';

@Component({
  selector: 'app-candidate-details',
  imports: [NgComponentOutlet],
  templateUrl: './candidate-details.component.html',
  styleUrl: './candidate-details.component.css'
})
export class CandidateDetailsComponent implements OnChanges {
  @Input() candidate!: Candidate; // Candidate data is received from a resolver via an input
  actionsSelection: Type<any> | null = null; // represents a Component or object is instance of (Component to render)
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['candidate']) {
      this.actionsSelection = this.selectActionsComponent();
    }
  }

  private selectActionsComponent(): Type<any> {
    switch(this.candidate.status){
      case 'CV evaluation':
        return CvEvaluationComponent;
      case 'Interview preparation':
        return InterviewPreparationComponent;
      case 'Interview Feedback': 
        return InterviewFeedbackComponent;
      case 'Rejected':
        return RejectionLetterComponent;
      case 'Approved': 
        return this.candidate.offerAccepted
            ? OnboardingPreparationComponent
            : CandidateFinalizationComponent;
      default:
        throw new Error(`Unknown candidate status: ${this.candidate.status}`);
    }
  }
}
