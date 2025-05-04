import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { isAuth } from '../../functions/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  isAuth$ = isAuth();
}
