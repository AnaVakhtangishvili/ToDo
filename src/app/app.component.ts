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

  formVisibility: boolean = false;
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
    this.todo.push({taskName: this.addNewTask.taskName, taskLevel: this.addNewTask.taskLevel, id: this.todo.length});
    this.formVisibility = false;
    console.log(this.todo);
  }

  deleteTask(id: number) {
    this.todo = this.todo.filter(e => e.id !== id);
  }

  moveInProgress(id: number) {
    const element: any  = this.todo.find(e => e.id === id);
    this.inProgress.push({...element, id: this.inProgress.length});
    this.todo = this.todo.filter(e => e.id !== id);
    console.log(element);
  }

  moveInTodo(id: number) {
    const element: any  = this.inProgress.find(e => e.id === id);
    this.todo.push({...element, id: this.todo.length});
    this.inProgress = this.inProgress.filter(e => e.id !== id);
    console.log(element);
  }

  moveInDone(id: number) {
    const element: any = this.inProgress.find(e => e.id === id);
    this.done.push({...element, id: this.done.length});
    this.inProgress = this.inProgress.filter(e => e.id !== id);
    console.log(element); 
  }

  fromDoneToInProgress(id: number) {
    const element: any = this.done.find(e => e.id === id);
    this.inProgress.push({...element, id: this.inProgress.length});
    this.done = this.done.filter(e => e.id !== id);
    console.log(element); 
  }
}