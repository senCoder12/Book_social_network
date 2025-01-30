import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';
import { CodeInputModule } from "angular-code-input";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activate-account', 
  standalone: true,
  imports: [ CodeInputModule, CommonModule ],
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

    onCodeCompleted(token: string): void {
      this.confirmAccount(token);
    }
    confirmAccount(token: string) {
      this.authService.confirm({
        token
      }).subscribe({
        next: ()=> {
          this.message = "Your account has been successfully activated.\nNow  you can proceed to login"
          this.submitted = true;
          this.isOkay = true;
        },
        error: ()=> {
          this.message = "Token has been invalid or expired";
          this.submitted = true;
          this.isOkay = false;
        }
      })
    }

    redirectToLogin() {
      this.router.navigate(['login']);
    }

}
