import { Component, input } from '@angular/core';

@Component({
  selector: 'app-taskly',
  imports: [],
  templateUrl: './taskly.html',
  styleUrl: './taskly.css',
})
export class Taskly {
 collapse = input(false);
}
