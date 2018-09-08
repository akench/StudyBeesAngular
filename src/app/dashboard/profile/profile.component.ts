import { Component, OnInit } from '@angular/core';
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
  selectedSchool: string;
  schoolList: string[] = institutions.default.map(obj => obj.institution);
  courseList = courses.default;

  firstname: string;
  lastname: string;
  school: string;

  constructor(private userService: UserService,
              private stitchService: StitchService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
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
          school: this.selectedSchool
        }
      },
      null,
      () => {
        this.snackBar.open('Profile saved successfully!', 'Ok', {
          duration: 1000
        });
      },
      () => {
        this.snackBar.open('Failed to save profile, please try again.');
      }
    );
  }

}
