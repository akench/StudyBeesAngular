import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('login') loginComponent: LoginComponent;
  @ViewChild('register') registerComponent: RegisterComponent;

  constructor() { }

  ngOnInit() {
  }

  onSwitch() {
    this.loginComponent.reset();
    this.registerComponent.reset();
  }

}
