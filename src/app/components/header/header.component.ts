import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = 'Task Tracker';
  showAddTask: boolean = false;
  subscription: Subscription | undefined;
  updateObj: Task | undefined


  constructor( private uiService: UiService ) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value)
    this.subscription = this.uiService.onToggleUpdate().subscribe(value => this.updateObj = value)

  }

  ngOnInit(): void {
    console.log(this.updateObj)
  }

  toggleAddTask() {
    this.uiService.toggleAddTask()
  }
}
