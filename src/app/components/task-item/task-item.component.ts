import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task : Task | undefined;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter()
  @Output() onToggleTask: EventEmitter<Task> = new EventEmitter()
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter()
  faTimes = faTimes
  subscription: Subscription | undefined;

  constructor ( private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe()
  }
  onDelete() {
    console.log('Delete from task item service')
    this.onDeleteTask.emit(this.task)
  }

  toggleUpdateTask () {
    this.uiService.toggleUpdateTask(this.task)
  }

  onToggle() {
    console.log('ontoggle')
    this.onToggleTask.emit(this.task)
  }
}
