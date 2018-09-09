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
  options: any = {maxLines: 1000, printMargin: false};

  @ViewChild('editor') editor: AceEditorComponent;

  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    this.websocketService.getSocket().on('addEditor', (data) => {
      const text = data.data;
      this.text = text;
      this.hasUpdated = true;
      this.syncedString = text;
    });
  }

  onChange(code) {
    if (this.hasUpdated) {
      this.hasUpdated = false;
      return;
    }
    if (this.syncedString === code) {
      this.hasUpdated = false;
      return;
    }
    this.websocketService.emit('sendEditor', code);
    console.log(code);
  }

  downloadText() {
    const anchor = document.createElement('a');
    const encodedText = encodeURIComponent(this.text);

    anchor.setAttribute('href', `data:text/plain;charset=utf-8,${encodedText}`);
    anchor.setAttribute('download', 'filename');

    anchor.style.display = 'none';
    document.body.appendChild(anchor);

    anchor.click();
    document.body.removeChild(anchor);
  }

}
