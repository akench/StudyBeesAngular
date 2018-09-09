import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FinderComponent } from './finder/finder.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular material UI elements
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
      DashboardComponent,
      ProfileComponent,
      FinderComponent
    ],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule,
      MatSnackBarModule,
      MatSlideToggleModule,
      MatCardModule
    ],
    exports: [DashboardComponent]
  })
export class DashboardModule {}
