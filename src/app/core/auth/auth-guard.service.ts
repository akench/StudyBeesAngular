import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StitchService } from '../stitch/stitch.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private stitchService: StitchService, private router: Router) { }

  canActivate(): boolean {
    if (this.stitchService.getStitchClient().auth.isLoggedIn) {
      return true;
    };
    this.router.navigate(['']);
    return false;
  }
}
