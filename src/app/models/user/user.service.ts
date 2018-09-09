import { Injectable } from '@angular/core';
import { StitchService } from '../../core/stitch/stitch.service';
import { User } from './user';
import { RemoteUpdateOptions } from 'mongodb-stitch-browser-sdk';

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

  updateUser(filter: {}, update: {}, updateOptions?: RemoteUpdateOptions, onSuccess?: () => void, onErr?: () => void) {
    this.stitchService.getDB().collection('users').updateOne(filter, update, updateOptions).then( _ => {
      if (onSuccess !== undefined) {
        onSuccess();
      }
    }).catch( _ => {
      if (onErr !== undefined) {
        onErr();
      }
    });
  }

  getUser() {
    const email: String = this.stitchService.getUserEmail();
    return this.stitchService.getDB().collection('users').find({ 'email': email}).first();
  }

}
