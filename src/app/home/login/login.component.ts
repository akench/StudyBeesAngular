import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StitchService } from '../../core/stitch/stitch.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(private stitchService: StitchService,
              private router: Router) { }

  submitForm() {
    this.stitchService.loginUser(this.email, this.password)
      .then(authedId => {
        console.log(`successfully logged in with id: ${authedId}`);
        this.router.navigate(['dashboard']);
      })
      .catch(err => console.error(`login failed with error: ${err}`));
  }
}
