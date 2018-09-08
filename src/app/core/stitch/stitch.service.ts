import { Injectable } from '@angular/core';
import { Stitch, StitchAppClient } from "mongodb-stitch-browser-sdk";
import * as environment from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StitchService {

  private mClient: StitchAppClient;

  constructor() { 
    this.mClient = Stitch.initializeDefaultAppClient(environment.configuration.stitchAppId);
  }

  getStitchClient(): StitchAppClient {
    return this.mClient;
  }
}
