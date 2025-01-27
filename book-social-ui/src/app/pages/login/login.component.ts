import { Component} from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

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

  constructor(private authService: AuthenticationService, private router: Router) {}


  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        // todo save the token
        
        this.router.navigate(['books']);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  register() {
    this.router.navigate(['register']);
  }
}
