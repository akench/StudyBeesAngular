import { Injectable } from '@angular/core';
import { UserPasswordCredential } from 'mongodb-stitch-browser-sdk';
import { StitchService } from '../../core/stitch/stitch.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private stitchService: StitchService) { }

  loginUser(email, password) {
    const credential = new UserPasswordCredential(email, password);
    return this.stitchService.getStitchClient().auth.loginWithCredential(credential);
  }

}
