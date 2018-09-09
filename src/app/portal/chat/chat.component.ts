import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../core/websocket/websocket.service';
import { Message } from '../../models/message';
import { User } from '../../models/user/user';
import { UserService } from '../../models/user/user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  currMsg: string = null;
  messages: Message[] = [];
  ioConnection: any;

  constructor(private websocketService: WebsocketService,
    private userService: UserService) { }

  ngOnInit() {
    this.initIo();
  }

  private initIo(): void {
    this.websocketService.getSocket().on('addMessage', (message: Message) => {
      message['isMe'] = false;
      this.messages.push(message);
    });
  }

  public sendMessage() {

    // creates a user object from database
    this.userService.getUser().then((userObj: any) =>  {

      const msg: Message = {name: userObj.first_name, msg: this.currMsg, time: 0, isMe: true};
      this.messages.push(msg);

      // send this message to the web socket so the other person can see it
      this.websocketService.emit('sendMessage', this.currMsg);

      // reset curr message
      this.currMsg = '';

    }).catch(err => console.log(err));

  }
}
