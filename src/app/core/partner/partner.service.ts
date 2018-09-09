import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  partner: User;

  constructor() { }

  setPartner(partner: User) {
    this.partner = partner;
  }

  getPartner() {
    return this.partner;
  }
}
