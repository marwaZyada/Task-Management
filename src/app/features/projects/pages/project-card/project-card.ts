import { Component, input } from '@angular/core';
import { IProject } from '../../models/iproject';


@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
   project = input.required<IProject>();
}
