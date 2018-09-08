import { Injectable } from '@angular/core';
import { StitchService } from '../../../core/stitch/stitch.service';

@Injectable({
  providedIn: 'root'
})
export class FinderService {

  constructor(private stitchService: StitchService) { }

  findUser(courses: string[]) {
  }
}
