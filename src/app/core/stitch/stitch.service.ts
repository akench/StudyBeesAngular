import { Injectable } from '@angular/core';
import { Stitch, StitchAppClient, RemoteMongoDatabase, RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import * as environment from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StitchService {

  private mClient: StitchAppClient;
  private db: RemoteMongoDatabase;

  constructor() { 
    this.mClient = Stitch.initializeDefaultAppClient(environment.configuration.stitchAppId);
    this.db = this.mClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(environment.configuration.dbName);
  }

  getStitchClient(): StitchAppClient {
    return this.mClient;
  }

  getDB() {
    return this.db;
  }
}
