import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { EditorComponent } from './editor/editor.component';
import { ChatComponent } from './chat/chat.component';
import { TaskListComponent } from './task-list/task-list.component';
import { PortalComponent } from './portal.component';
import { CoreModule } from '../core/core.module';
import { SocketTestingComponent } from './socket-testing/socket-testing.component';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ColorPickerModule } from 'ngx-color-picker';
import { AceEditorModule } from 'ng2-ace-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    ColorPickerModule,
    AceEditorModule
  ],
  declarations: [
    PortalComponent,
    CanvasComponent,
    EditorComponent,
    ChatComponent,
    TaskListComponent,
    SocketTestingComponent],
  exports: [PortalComponent]
})
export class PortalModule { }
