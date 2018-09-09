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


  currentUserEmail: String;

  constructor(private websocketService: WebsocketService,
    private userService: UserService) { }

  ngOnInit() {

    const myUser: User = {'email': 'test@email.com', 'first_name': 'testuser', 'isActive': true};

    const myMsg: Message = {'from': myUser, 'content': 'hello wrodl!'};

    this.messages = [myMsg];

    this.userService.getUser().then((user: any) => {
      this.currentUserEmail = user.email;
    });

    this.initIo();
  }

  private initIo(): void {
    this.ioConnection = this.websocketService.onEvent('addMessage')
    .subscribe((message: Message) => {
      this.messages.push(message);
    });
  }

  public sendMessage() {

    // creates a user object from database
    this.userService.getUser().then((userObj: any) =>  {

      const user: User = {'first_name': userObj.firstname,
                          'last_name': userObj.lastname,
                          'email': userObj.email,
                          'school': userObj.school,
                          'courses': userObj.courses,
                          'isActive': true};

      const msg: Message = {'from': user, 'content': this.currMsg, 'time': 0};
      this.messages.push(msg);

      console.log('message:' + msg);

      // send this message to the web socket so the other person can see it
      this.websocketService.emit('sendMessage', this.currMsg);

      // reset curr message
      this.currMsg = '';

    }).catch(err => console.log(err));

  }
}
