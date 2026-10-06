import { Component, input, output } from '@angular/core';
import { IProject } from '../../models/iproject';




@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
   project = input<IProject>();
  edit = output<IProject>();

    onEdit() {
    this.edit.emit(this.project()!);
  }
}
