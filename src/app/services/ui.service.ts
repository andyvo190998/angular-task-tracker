import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../Task';
@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showAddTask: boolean = false
  private subject = new Subject<any>()
  private updateTask: any

  constructor() { }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask
    this.subject.next(this.showAddTask)
  }

  toggleUpdateTask(task: any): void {
    this.updateTask = task
    this.showAddTask = !this.showAddTask
    this.subject.next(this.showAddTask)
    this.subject.next(this.updateTask)
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable()
  }

  onToggleUpdate(): Observable<any> {
    return this.subject.asObservable()
  }

}