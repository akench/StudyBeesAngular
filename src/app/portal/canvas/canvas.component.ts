import { Component, AfterViewInit, Input, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { ColorPickerService } from 'ngx-color-picker';
import { WebsocketService } from '../../core/websocket/websocket.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  // a reference to the canvas element from our template
  @ViewChild('canvas') public canvas: ElementRef;
  private prev: {x: number, y: number} = undefined;
  private down: boolean = false; 
  private history: {arr: {x: number, y: number}[], settings: {color: string, width: number, lineCap: string}}[] = [];
  private redoHistory: {arr: {x: number, y: number}[], settings: {color: string, width: number, lineCap: string}}[] = [];

  private cx: CanvasRenderingContext2D;  
  private colors = ['black'];
  private selectedColor = ['blue'];

  constructor(private cpService: ColorPickerService, private websocketService: WebsocketService) { }

  public ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');
    
    // set the width and height
    // canvasEl.width = this.width;
    // canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.websocketService.getSocket().on('addMessage', (data: any) => {
      if (data.type == 'add') this.history.push(data.data);
      else if (data.type == 'undo') this.undo();
      else if (data.type == 'redo') this.redo();
      else if (data.type == 'clear') this.clear();
      else {
        alert('invalid type: ' + data.type);
      }
      this.history.push(data);
    });
  }

  @HostListener('document:mousedown', ['$event']) 
  private onMouseDown(e) {
    var pos = this.getPos(e);
    if (!this.isInside(pos)) return;
    this.cx.strokeStyle = this.colors[0];
    this.history.push({arr: [pos], settings: {color: this.colors[0], width: 3, lineCap: 'round'}});
    if (this.redoHistory.length != 0) this.redoHistory = [];
    this.down = true;
    this.prev = pos;
    this.draw(pos);
  }
  
  @HostListener('document:mouseup', ['$event']) 
  private onMouseUp(e) {
    if (!this.down) return;
    this.down = false;
    var pos = this.getPos(e);
    var arr = this.history[this.history.length - 1].arr.push(pos);
    this.draw(pos);
    this.sendData('add');
  }
  
  @HostListener('document:mousemove', ['$event']) 
  private onMouseMove(e) {
    if (!this.down) return;
    var pos = this.getPos(e);
    var arr = this.history[this.history.length - 1].arr.push(pos);
    this.draw(pos);
    this.prev = pos;
    // if (this.isInside(pos)) return;
    // this.prev = undefined;
  }

  private getPos(e): {x: number, y: number} {
    const canvasEl = this.canvas.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    return {x: e.x - rect.left, y: e.y - rect.top};
  }

  private isInside(loc: {x: number, y: number}) {
    const canvasEl = this.canvas.nativeElement;
    return loc.x > 0 && loc.y > 0 && loc.x < canvasEl.width && loc.y < canvasEl.height;
  }

  private draw(loc: {x: number, y: number}) {
    this.cx.beginPath();
    if (this.prev === undefined) this.cx.moveTo(loc.x, loc.y);
    else this.cx.moveTo(this.prev.x, this.prev.y);
    this.cx.lineTo(loc.x, loc.y);
    this.cx.stroke();
  }

  private undo() {
    if (this.history.length == 0) return;
    this.history.splice(this.history.length - 1, 1).forEach((ele) => {
      this.redoHistory.splice(0, 0, ele);
    });
    this.redraw();
    this.sendData('undo');
  }

  private redo() {
    if (this.redoHistory.length == 0) return;
    this.history.push(this.redoHistory.splice(0, 1)[0]);
    this.redraw();
    this.sendData('redo');
  }

  private clear() {
    this.wipe();
    this.history = [];
    this.redoHistory = [];
    this.sendData('clear');
  }
  
  private wipe() {
    this.cx.beginPath();
    this.cx.rect(0, 0, 1000, 1000);
    this.cx.fillStyle = 'white';
    this.cx.fill();
  }

  private redraw() {
    this.wipe();
    this.history.forEach((ele) => {
      this.prev = undefined;
      ele.arr.forEach((e) => {
        var pos = e;
        this.draw(pos);
        this.prev = pos;
      });
    });
  }

  private sendData(type: string) {
    var data: any = {type: type};
    if (type == 'add') data.data = this.history[this.history.length - 1];
    this.websocketService.emit('sendMessage', data);
  }
}
