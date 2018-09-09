import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StitchService } from '../../core/stitch/stitch.service';
import { UserService } from '../../models/user/user.service';
import { RemoteUpdateOptions } from 'mongodb-stitch-browser-sdk';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(private stitchService: StitchService,
              private router: Router,
              private userService: UserService) { }

  submitForm() {
    this.stitchService.loginUser(this.email, this.password)
      .then(authedId => {
        console.log(`successfully logged in with id: ${authedId}`);
        const filter = {
          email: this.email
        };
        const update = {
          $set: { isActive: true },
        };
        const updateOptions: RemoteUpdateOptions = {
          upsert: true
        };

        // user is logged in
        this.userService.updateUser(filter, update, updateOptions);
        this.router.navigate(['dashboard']);

      })
      .catch(err => {
        console.error(`login failed with error: ${err}`);
        alert('Username and password combination is invalid');
      });
  }

  reset() {
    this.email = undefined;
    this.password = undefined;
  }
}
