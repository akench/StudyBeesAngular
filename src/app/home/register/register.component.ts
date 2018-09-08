import { Component } from '@angular/core';
import { StitchService } from '../../core/stitch/stitch.service';
import { UserService } from '../../models/user/user.service';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string;
  password: string;
  confirmPassword: string;

  constructor(private stichService: StitchService, private userService: UserService) { }

  submitForm() {
    if (this.password !== this.confirmPassword) {
      console.log('mismatch');
    }

    const emailPasswordClient = this.stichService.getAuthProviderClient();
    emailPasswordClient.registerWithEmail(this.email, this.password)
      .then(() => {
        const user: User = {
          email: this.email,
          isActive: false
        };
        this.userService.insertUser(user);
      })
      .catch(error => {
        alert(error.message);
      });
  }

}
