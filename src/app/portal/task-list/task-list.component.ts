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

<<<<<<< HEAD

=======
>>>>>>> 374502ec06edd8b9d30eeff3e61bf595bd852749
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
    console.log(task);
    task = task.data;
    if (task['type'] === TaskActionType.Add) {
      this.tasks.push({ name: task['name'], completed: false });
    } else if (task['type'] === TaskActionType.Toggle) {
      const index = task['index'];
      this.tasks[index].completed = task['state'];
    }
  }

}
