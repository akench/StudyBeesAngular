import { Component, OnInit } from '@angular/core';
import { StitchService } from '../../core/stitch/stitch.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from '../../models/user/user';
import { UserService } from '../../models/user/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  isConfirmed = false;

  constructor(private stitchService: StitchService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    // Parse the URL query parameters
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const token = params.get('token');
    const tokenId = params.get('tokenId');

    if (token == null || tokenId == null) {
      return;
    }

    // Confirm the user's email/password account
    const emailPassClient = this.stitchService.getAuthProviderClient();
    emailPassClient.confirmUser(token, tokenId)
      .then(() => {
        console.log('success');
        this.router.navigate(['login']);
      })
      .catch(error => {
        console.log('error');
        console.log(error);
      });
  }

}
