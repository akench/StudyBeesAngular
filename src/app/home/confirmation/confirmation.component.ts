import { Component, OnInit } from '@angular/core';
import { StitchService } from '../../core/stitch/stitch.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  isConfirmed: boolean;

  constructor(private stichService: StitchService) { }

  ngOnInit() {
    // Parse the URL query parameters
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const token = params.get('token');
    const tokenId = params.get('tokenId');

    // Confirm the user's email/password account
    const emailPassClient = this.stichService.getAuthProviderClient();
    emailPassClient.confirmUser(token, tokenId)
      .then(data => {
        console.log('success');
        console.log(data);
      })
      .catch(error => {
        console.log('error');
        console.log(error);
      });
  }

}
