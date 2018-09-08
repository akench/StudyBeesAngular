import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../core/websocket/websocket.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  ioConnection: any;

  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    this.initIo();
  }

  private initIo(): void {
    this.ioConnection = this.websocketService.onEvent('addMessage')
    .subscribe((message: Message) => {
      this.messages.push(message);
    });
  }

  public sendMessage(message: string) {
    this.websocketService.emit('sendMessage', 'hello world');
  }
}
