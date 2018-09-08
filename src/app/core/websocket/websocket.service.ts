import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'https://server.studybeehive.com:8443';;

@Injectable()
export class WebsocketService {
  constructor() { }

  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
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
