import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular imports
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

@NgModule({
    declarations: [
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ConfirmationComponent
    ],
    imports: [
      CommonModule,
      MatTabsModule,
      MatInputModule,
      MatFormFieldModule
    ],
    exports: [HomeComponent, ConfirmationComponent]
  })
  export class HomeModule { }
