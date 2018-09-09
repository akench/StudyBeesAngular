import { Component, OnInit } from '@angular/core';
import { FinderService } from './services/finder.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent implements OnInit {

  selectedCourse: string;
  placeholder = 'Select a Course';

  courses: string[] = [];
  constructor(private finderService: FinderService) { }

  ngOnInit() {
    this.finderService.getUserCourses( courses => {
      this.courses = courses;
    });
  }

}
