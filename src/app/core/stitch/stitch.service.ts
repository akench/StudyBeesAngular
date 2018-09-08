import { Injectable } from '@angular/core';
import {
  Stitch,
  StitchAppClient,
  RemoteMongoDatabase,
  RemoteMongoClient,
  UserPasswordCredential,
  UserPasswordAuthProviderClient
} from 'mongodb-stitch-browser-sdk';
import * as environment from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StitchService {

  private mClient: StitchAppClient;
  private db: RemoteMongoDatabase;

  private currentEmail: string;

  constructor() {
    this.mClient = Stitch.initializeDefaultAppClient(environment.configuration.stitchAppId);
    this.db = this.mClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(environment.configuration.dbName);
  }

  getStitchClient(): StitchAppClient {
    return this.mClient;
  }

  getAuthProviderClient() {
    return this.mClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
  }

  getDB(): RemoteMongoDatabase {
    return this.db;
  }

  getUserEmail(): string {
    return this.mClient.auth.user.profile.email;
  }

  loginUser(email, password) {
    this.currentEmail = email;
    const credential = new UserPasswordCredential(email, password);
    return this.mClient.auth.loginWithCredential(credential);
  }

}
