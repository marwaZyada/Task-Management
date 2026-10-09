import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-project-card',
  imports: [RouterLink],
  templateUrl: './add-project-card.html',
  styleUrl: './add-project-card.css',
})
export class AddProjectCard {
  addProject = output<void>();
}
