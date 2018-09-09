import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';
import { WebsocketService } from '../../core/websocket/websocket.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  text = '';
  hasUpdated = false;

  syncedString: string;

  @ViewChild('editor') editor: AceEditorComponent;

  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    this.websocketService.getSocket().on('addEditor', (data) => {
      const text = data.data;
      this.text = text;
    });
  }

  onChange(code) {
    this.websocketService.emit('sendEditor', code);
    console.log(code);
  }

}
