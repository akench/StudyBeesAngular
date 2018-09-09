import { Component, AfterViewInit, Input, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { ColorPickerService } from 'ngx-color-picker';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  // a reference to the canvas element from our template
  @ViewChild('canvas') public canvas: ElementRef;
  public prev: {x: number, y: number} = undefined;
  public down: boolean = false;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;  
  private colors = ['black'];
  private selectedColor = ['blue'];

  constructor(private cpService: ColorPickerService) { }

  public ngOnInit() {
    
  }

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
  }

  @HostListener('document:mousedown', ['$event']) 
  private onMouseDown(e) {
    var pos = this.getPos(e);
    if (!this.isInside(pos)) return;
    this.cx.strokeStyle = this.colors[0];
    this.down = true;
    this.prev = pos;
    this.draw(pos);
    console.log('down');
  }
  
  @HostListener('document:mouseup', ['$event']) 
  private onMouseUp(e) {
    if (!this.down) return;
    this.down = false;
    var pos = this.getPos(e);
    if (!this.isInside(pos)) return;
    this.draw(pos);
  }
  
  @HostListener('document:mousemove', ['$event']) 
  private onMouseMove(e) {
    if (!this.down) return;
    var pos = this.getPos(e);
    this.draw(pos);
    this.prev = pos;
    if (this.isInside(pos)) return;
    this.prev = undefined;
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
}
