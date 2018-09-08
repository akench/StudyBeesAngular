import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PortalModule } from './portal/portal.module';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortalComponent } from './portal/portal.component';
import { ConfirmationComponent } from './home/confirmation/confirmation.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketTestingComponent } from './socket-testing/socket-testing.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: 'login', component: HomeComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'portal', component: PortalComponent, canActivate: [AuthGuardService] },
  { path: 'testing', component: SocketTestingComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    SocketTestingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CoreModule,
    HomeModule,
    DashboardModule,
    PortalModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
