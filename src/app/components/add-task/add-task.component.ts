import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter
  text: string = '';
  day: string = '';
  reminder: boolean = false
  onOpenForm: boolean = false
  subscription: Subscription | undefined;
  updateObj: Task | undefined

  constructor( private uiService: UiService ) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.onOpenForm = value)
    this.subscription = this.uiService.onToggleUpdate().subscribe(value => {
      this.text = value.text;
      this.day = value.day;
      this.reminder = value.reminder
    })
  }

  ngOnInit(): void {}
  onSubmit() {
    if (!this.text) {
      alert('Please add task!')
      return
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask)

    this.text = ''
    this.day = ''
    this.reminder = false
  }
}
