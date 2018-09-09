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

  firstToggle = true;
  addingTask: string;
  tasks: Task[] = [];

  

  constructor(private socketService: WebsocketService,
              private userService: UserService) { }

  ngOnInit() {
    this.socketService.getSocket().on('addTask', task => this.appendPartnerTask(task));
  }

  toggleCompleted(i: number) {
    this.tasks[i].completed = !this.tasks[i].completed;
    console.log(i + ' is now ' + this.tasks[i].completed);

    this.socketService.emit('sendTask', {
      type: TaskActionType.Toggle,
      index: i,
      state: this.tasks[i].completed
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
<<<<<<< HEAD

    console.log(task);
    task = task.data;

=======
    console.log(task);
    task = task.data;
>>>>>>> 7534c0c814ba395d6655c8c9c2d69481d04b5960
    if (task['type'] === TaskActionType.Add) {
      this.tasks.push({ name: task['name'], completed: false });
    } else if (!this.firstToggle && task['type'] === TaskActionType.Toggle) {
      const index = task['index'];
      this.tasks[index].completed = task['state'];
<<<<<<< HEAD
=======
    } else if (this.firstToggle) {
      this.firstToggle = false;
>>>>>>> 7534c0c814ba395d6655c8c9c2d69481d04b5960
    }
  }

}
