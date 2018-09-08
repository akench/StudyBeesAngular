import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.css']
})
export class GlobalHeaderComponent implements OnInit {
  title = 'StudyBee'

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToDashboard() {
    console.log('navigating');
    this.router.navigate(['dashboard']);
  }

}
