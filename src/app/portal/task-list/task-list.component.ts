import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  addingTask: string;
  tasks: Task[] = [];

  constructor() { }

  ngOnInit() {

    this.tasks = [{completed: false,  name: 'task 1'}, {completed: false, name: 'task 2'}];

  }

  toggleCompleted(i: number) {

    this.tasks[i].completed = !this.tasks[i].completed;
    console.log(i + ' is now ' + this.tasks[i].completed);
  }

  addTask(): void {

    console.log(this.addingTask);

    const task: Task = {name: this.addingTask, completed: false};
    this.tasks.push(task);

    this.addingTask = '';
  }

}
