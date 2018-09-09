import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {

  text = '';

  @ViewChild('editor') editor: AceEditorComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  onChange(code) {
    console.log(code);
  }

}
