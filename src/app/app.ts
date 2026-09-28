import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Signup } from './features/auth/pages/signup/signup';
import { Taskly } from './shared/components/taskly/taskly';
//  import { Login } from './features/auth/pages/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Taskly],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Task-Management');
}
