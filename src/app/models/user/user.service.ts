import { Injectable } from '@angular/core';
import { StitchService } from '../../core/stitch/stitch.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private stitchService: StitchService) { }

  insertUser(user: User, onSuccess?: () => void, onErr?: () => void) {
    this.stitchService.getDB().collection('users').insertOne(user).then( () => {
      onSuccess();
    }).catch( () => {
      onErr();
    });
  }

  updateUser(filter: {}, update: {}, onSuccess?: () => void, onErr?: () => void) {
    this.stitchService.getDB().collection('users').updateOne(filter, update).then( _ => {
      onSuccess();
    }).catch( _ => {
      onErr();
    });
  }
}
