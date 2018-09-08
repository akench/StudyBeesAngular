import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StitchService } from '../stitch/stitch.service';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.css']
})
export class GlobalHeaderComponent implements OnInit {
  title = 'StudyBee'

  constructor(private router: Router, private stitchService: StitchService) { }

  ngOnInit() {
  }

  logoutUser() {
    this.stitchService.getStitchClient().auth.logout().then( () => {
      this.router.navigate(['login']);
    });
  }

}
