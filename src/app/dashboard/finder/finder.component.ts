import { Component, OnInit } from '@angular/core';
import { FinderService } from './services/finder.service';
import { WebsocketService } from '../../core/websocket/websocket.service';
import { UserService } from '../../models/user/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PartnerService } from '../../core/partner/partner.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent implements OnInit {

  selectedCourse: string;
  placeholder = 'Select a Course';
  spinnerMode = 'determinate';

  courses: string[] = [];
  constructor(private finderService: FinderService,
              private socketService: WebsocketService,
              private userService: UserService,
              private partnerService: PartnerService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.finderService.getUserCourses( courses => {
      this.courses = courses;
    });

    this.socketService.getSocket().on('connectWithPartner', data => this.onConnect(data));
  }

  connectUser() {
    if (!this.selectedCourse) {
      this.snackBar.open('Please select a course', 'Ok', {
        duration: 1000
      });

      return;
    }

    this.userService.getUser()
      .then((user) => {
        const userData = {
          email: user['email'],
          school: user['school'],
          course: this.selectedCourse,
          name: `${user['firstname']} ${user['lastname']}`
        };

        this.socketService.emit('makeAvailable', userData);
        this.spinnerMode = 'indeterminate';
      })
      .catch(() => {
        const snackBarRef = this.snackBar.open('Failed to connect, unable to find user data', 'Ok', {
          duration: 2000
        });

        snackBarRef.onAction().subscribe(() => {
          this.connectUser();
        });
      });
  }

  onConnect(connectedUser) {
    console.log(connectedUser);
    this.partnerService.setPartner(connectedUser);
    this.router.navigate(['portal']);
  }

}
