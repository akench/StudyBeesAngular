import { Injectable } from '@angular/core';
import { StitchService } from '../../../core/stitch/stitch.service';
import { User } from '../../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class FinderService {

  constructor(private stitchService: StitchService) { }

  findUser(courses: string[]) {
  }

  getUserCourses(onSuccess: (courses: string[]) => void) {
    const email = this.stitchService.getUserEmail();
    if (email === undefined) {
      return [];
    }
    const db = this.stitchService.getDB();
    let user: User;
    db.collection('users').find({email: email}).first().then( data => {
      user = data as User;
      const courses = user.courses === undefined ? [] : user.courses;
      onSuccess(courses);
    });
  }
}
