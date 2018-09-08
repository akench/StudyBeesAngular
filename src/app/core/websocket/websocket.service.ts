import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';

@Injectable()
export class WebsocketService {

  static serverUrl = 'https://server.studybeehive.com:8443';

  private socket;

  constructor() { 
    this.socket = socketIo(WebsocketService.serverUrl);
  }

  public emit(label: string, data: any) {
    this.socket.emit(label, data);
  }

  public onEvent(event: string): Observable<any> {
    return new Observable<Event>(observer => {
        this.socket.on(event, () => observer.next());
    });
  }
}
