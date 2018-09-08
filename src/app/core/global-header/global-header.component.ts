import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StitchService } from '../stitch/stitch.service';
import { UserService } from '../../models/user/user.service';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.css']
})
export class GlobalHeaderComponent implements OnInit {
  title = 'StudyBee'

  constructor(private router: Router, private stitchService: StitchService, private userService: UserService) { }

  ngOnInit() {
  }

  logoutUser() {
    const currentEmail = this.stitchService.getUserEmail();
    if (currentEmail !== undefined) {
      const filter = {
        email: currentEmail
      };
      const update = {
        $set: { isActive: false },
      };
      this.userService.updateUser(filter, update);
    }
    this.stitchService.getStitchClient().auth.logout().then( () => {
      this.router.navigate(['login']);
    });
  }

}
