import { Component, AfterViewInit, Input, ElementRef, ViewChild, NgModule, HostListener } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

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
    if (!this.isInside(pos)) {console.log('outside'); return; }
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

  // private captureEvents(canvasEl: HTMLCanvasElement) {
  //   // this will capture all mousedown events from teh canvas element
  //   fromEvent(canvasEl, 'mousedown')
  //     .switchMap((e) => {
  //       return Observable
  //         // after a mouse down, we'll record all mouse moves
  //         .fromEvent(canvasEl, 'mousemove')
  //         // we'll stop (and unsubscribe) once the user releases the mouse
  //         // this will trigger a 'mouseup' event    
  //         .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
  //         // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
  //         .takeUntil(Observable.fromEvent(canvasEl, 'mouseleave'))
  //         // pairwise lets us get the previous value to draw a line from
  //         // the previous point to the current point    
  //         .pairwise()
  //     })
  //     .subscribe((res: [MouseEvent, MouseEvent]) => {
  //       const rect = canvasEl.getBoundingClientRect();
  
  //       // previous and current position with the offset
  //       const prevPos = {
  //         x: res[0].clientX - rect.left,
  //         y: res[0].clientY - rect.top
  //       };
  
  //       const currentPos = {
  //         x: res[1].clientX - rect.left,
  //         y: res[1].clientY - rect.top
  //       };
      
  //       // this method we'll implement soon to do the actual drawing
  //       this.drawOnCanvas(prevPos, currentPos);
  //     });
  // }
}
