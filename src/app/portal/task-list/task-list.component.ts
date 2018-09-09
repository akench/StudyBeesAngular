import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { WebsocketService } from '../../core/websocket/websocket.service';
import { UserService } from '../../models/user/user.service';

enum TaskActionType {
  Toggle,
  Add
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  addingTask: string;
  tasks: Task[] = [];

  constructor(private socketService: WebsocketService,
              private userService: UserService) { }

  ngOnInit() {
    this.socketService.getSocket().on('addTask')
      .subscribe(task => this.appendPartnerTask(task));
  }

  toggleCompleted(i: number) {
    this.tasks[i].completed = !this.tasks[i].completed;
    console.log(i + ' is now ' + this.tasks[i].completed);

    this.socketService.emit('sendTask', {
      type: TaskActionType.Toggle,
      index: i
    });
  }

  addTask(): void {
    console.log(this.addingTask);
    const task: Task = {name: this.addingTask, completed: false};
    this.tasks.push(task);

    this.socketService.emit('sendTask', {
      type: TaskActionType.Add,
      name: this.addingTask
    });

    this.addingTask = '';
  }

  appendPartnerTask(task) {
    if (task['type'] === TaskActionType.Add) {
      this.tasks.push({ name: task['name'], completed: false });
    } else if (task['type'] === TaskActionType.Toggle) {
      const index = task['index'];
      const currTask: Task  = this.tasks[index];
      currTask.completed = !currTask.completed;
    }
  }

}
