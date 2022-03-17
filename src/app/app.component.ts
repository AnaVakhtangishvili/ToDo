import { Component } from '@angular/core';

interface Task {
  taskName: string,
  taskLevel: string,
  id: number,
}

type NewTask = Omit<Task, 'id'>;

enum TaskLevel {
  easy = "Easy",
  medium = "Medium",
  hard = "Hard"
}

enum Status {
  todo= "ToDo",
  inProgress = "In Progress",
  done = "Done"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDo';

  initialId: number = 0;
  formVisibility: boolean = false;
  placeholderText: string = 'this list is empty';
  level = TaskLevel;
  status = Status;

  addNewTask: NewTask = {
    taskName: '',
    taskLevel: '',
  }

  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  showForm() {
    this.formVisibility = true;
  }

  addTask(name: string, level: string) {
    this.addNewTask.taskName = name;
    this.addNewTask.taskLevel = level;
    this.todo.push({taskName: this.addNewTask.taskName, taskLevel: this.addNewTask.taskLevel, id: this.initialId});
    this.formVisibility = false;
    this.initialId++;
    console.log(this.todo);
  }

  deleteTask(id: number) {
    this.todo = this.todo.filter(e => e.id !== id);
  }

  moveInProgress(id: number) {
    const element: any = this.todo.find(e => e.id === id);
    this.inProgress.push(element);
    this.todo = this.todo.filter(e => e.id !== id);
  }

  moveInTodo(id: number) {
    const element: any  = this.inProgress.find(e => e.id === id);
    this.todo.push(element);
    this.inProgress = this.inProgress.filter(e => e.id !== id);
  }

  moveInDone(id: number) {
    const element: any = this.inProgress.find(e => e.id === id);
    this.done.push(element);
    this.inProgress = this.inProgress.filter(e => e.id !== id);
  }

  fromDoneToInProgress(id: number) {
    const element: any = this.done.find(e => e.id === id);
    this.inProgress.push(element);
    this.done = this.done.filter(e => e.id !== id);
  }

  addClass(level: string) {
    return {
    'badge-easy': level === TaskLevel.easy,
    'badge-medium': level === TaskLevel.medium,
    'badge-hard': level === TaskLevel.hard
    }
  }
}