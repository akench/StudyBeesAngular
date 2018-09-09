import { Component, OnInit, ViewChild } from '@angular/core';
import { FinderComponent } from './finder/finder.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('finder') finder: FinderComponent;

  constructor() { }

  ngOnInit() {
  }

  reloadFinder() {
    this.finder.getCourses();
  }

}
