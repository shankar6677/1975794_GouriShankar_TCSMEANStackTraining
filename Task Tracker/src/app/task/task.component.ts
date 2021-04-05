import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Array<any> = [];
  displayedColumns: string[] = ['id', 'name', 'task', 'deadline'];
  constructor(public taskServ: TaskService) { }

  ngOnInit(): void {
    this.taskServ.getTasks().subscribe(result => this.tasks = result, error => console.log(error));
  }

  submitTask(taskRef: any) {
    this.taskServ.storeTask(taskRef);
  }
}
