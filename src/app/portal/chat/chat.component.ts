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

  currMsg: String = null;
  messages: Message[] = [];
  ioConnection: any;

  constructor(private websocketService: WebsocketService,
    private userService: UserService) { }

  ngOnInit() {

    const myUser: User = {'email': 'test@email.com', 'first_name': 'testuser', 'isActive': true};

    const myMsg: Message = {'from': myUser, 'content': 'hello wrodl!'};

    this.messages = [myMsg];

    this.initIo();
  }

  private initIo(): void {
    this.ioConnection = this.websocketService.onEvent('addMessage')
    .subscribe((message: Message) => {
      this.messages.push(message);
    });
  }

  public sendMessage() {

    const msg: Message = this.createMessage(this.currMsg);
    // this.messages.push(this.currMsg)
    console.log('message:' + this.currMsg);
    this.websocketService.emit('sendMessage', this.currMsg);
  }

  private createMessage(text: String): Message {

    this.userService.getUser().then((data) =>  {
        console.log(data);
    });

    return null;

  }
}
