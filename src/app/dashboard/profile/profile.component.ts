import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as institutions from './institutions';
import * as courses from './courses';
import { UserService } from '../../models/user/user.service';
import { StitchService } from '../../core/stitch/stitch.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedCourses: string[];
  schoolList: string[] = institutions.default.map(obj => obj.institution);
  courseList = courses.default;

  isActive: boolean;
  firstname: string;
  lastname: string;
  school: string;

  @Output() profileSave = new EventEmitter();

  constructor(private userService: UserService,
              private stitchService: StitchService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userService.getUser()
      .then((data) => {
        this.isActive = data['isActive'];
        this.firstname = data['firstname'];
        this.lastname = data['lastname'];
        this.school = data['school'];
        this.selectedCourses = data['courses'];
      })
      .catch(() => [
        this.snackBar.open('Unable to find user profile :(', 'Ok', {
          duration: 1000
        })
      ]);
  }

  saveProfile() {
    this.userService.updateUser(
      {
        email: this.stitchService.getUserEmail()
      },
      {
        $set: {
          firstname: this.firstname,
          lastname: this.lastname,
          courses: this.selectedCourses,
          school: this.school
        }
      },
      null,
      () => {
        this.profileSave.emit();
        this.snackBar.open('Profile saved successfully!', 'Ok', {
          duration: 1000
        });
      },
      () => {
        this.snackBar.open('Failed to save profile, please try again.');
      }
    );
  }

  toggleActive() {
    this.userService.updateUser(
      { email: this.stitchService.getUserEmail() },
      { $set: { isActive: !this.isActive } },
      null,
      () => {
        this.isActive = !this.isActive;
        this.snackBar.open('Profile saved successfully!', 'Ok', {
          duration: 1000
        });
      },
      () => {
        this.snackBar.open('Unable to toggle setting, please refresh and try again.', 'Ok', {
          duration: 1000
        });
      }
    );
  }

}
