import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ConfirmationComponent
    ],
    imports: [
      CommonModule
    ],
    exports: [HomeComponent, ConfirmationComponent]
  })
  export class HomeModule { }