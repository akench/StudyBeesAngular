import { StitchService } from './stitch/stitch.service';
import { WebsocketService } from './websocket/websocket.service';
import { NgModule } from '@angular/core';
import { GlobalHeaderComponent } from './global-header/global-header.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
    providers: [StitchService, WebsocketService],
    imports: [
      CommonModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule
    ],
    declarations: [GlobalHeaderComponent],
    exports: [GlobalHeaderComponent]
})
export class CoreModule { }