import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(private loginService: LoginService,
              private router: Router) { }

  submitForm() {
    this.loginService.loginUser(this.email, this.password)
      .then(authedId => {
        console.log(`successfully logged in with id: ${authedId}`);
        this.router.navigate(['dashboard']);
      })
      .catch(err => console.error(`login failed with error: ${err}`));
  }
}
