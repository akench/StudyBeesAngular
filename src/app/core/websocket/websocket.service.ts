import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';

@Injectable()
export class WebsocketService {

  static serverUrl = 'https://server.studybeehive.com:8443';

  private socket;

  constructor() {
    this.socket = socketIo(WebsocketService.serverUrl);
    this.socket.on('err', (data) => { alert('type: ' + data.type + ', msg: ' + data.msg)});
    // this.onEvent('err')
    // .subscribe((errorMsg: any) => {
    //   alert(errorMsg.type + ': ' + errorMsg.msg);
    // });
  }

  public emit(label: string, data: any) {
    this.socket.emit(label, data);
  }

  public getSocket(): any {
    return this.socket;
  }
}
