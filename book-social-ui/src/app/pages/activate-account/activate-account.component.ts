import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [ ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
      private authService: AuthenticationService, 
      private router: Router 
    ) {}

    onCodeCompleted($event: string): void {

    }

}
