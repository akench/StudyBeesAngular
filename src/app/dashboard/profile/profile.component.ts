import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as institutions from "./institutions";
import * as courses from "./courses";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  coursesControl = new FormControl();
  schoolControl = new FormControl();
  courseList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  schoolList: string[] = institutions.default.map(obj => obj.institution);
  courseList = courses.default;

  firstname: string;
  lastname: string;
  school: string;

  constructor() {
  }

  ngOnInit() {
  }

}
