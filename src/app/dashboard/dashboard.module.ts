import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FinderComponent } from './finder/finder.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
      DashboardComponent,
      ProfileComponent,
      FinderComponent
    ],
    imports: [
      CommonModule
    ],
    exports: [DashboardComponent]
  })
export class DashboardModule {}