import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { EditorComponent } from './editor/editor.component';
import { ChatComponent } from './chat/chat.component';
import { TaskListComponent } from './task-list/task-list.component';
import { PortalComponent } from './portal.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PortalComponent,
    CanvasComponent,
    EditorComponent,
    ChatComponent,
    TaskListComponent],
  exports: [PortalComponent]
})
export class PortalModule { }
