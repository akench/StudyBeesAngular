import { Component } from '@angular/core';
import { StitchService } from '../../core/stitch/stitch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string;
  password: string;
  confirmPassword: string;

  constructor(private stichService: StitchService,
              private router: Router) { }

  submitForm() {
    if (this.password !== this.confirmPassword) {
      console.log('mismatch');
      return;
    }

    const emailPasswordClient = this.stichService.getAuthProviderClient();
    emailPasswordClient.registerWithEmail(this.email, this.password)
      .then(() => {
        this.router.navigate(['confirmation']);
        console.log('success');
      })
      .catch(error => {
        alert(error.message);
      });
  }

}
