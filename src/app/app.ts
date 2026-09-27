import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Signup } from './features/auth/pages/signup/signup';
import { Taskly } from './shared/components/taskly/taskly';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Signup, Taskly],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Task-Management');
}
