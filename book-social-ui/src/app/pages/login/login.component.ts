import { Component} from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  authRequest: AuthenticationRequest = { email: "", password: "" };
  errorMsg: Array<string> = [];
  loading: boolean = false;

  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    private tokenService: TokenService  
  ) {}


  login() {
    this.errorMsg = [];
    this.loading = true;
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['books']);
      },
      error: (err) => {
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
        this.loading = false; 
      },
    })
  }

  register() {
    this.router.navigate(['register']);
  }
}
