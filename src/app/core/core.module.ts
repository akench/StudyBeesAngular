import { StitchService } from './stitch/stitch.service';
import { WebsocketService } from './websocket/websocket.service';
import { NgModule } from '@angular/core';

@NgModule({
    providers: [StitchService, WebsocketService],
})
export class CoreModule { }