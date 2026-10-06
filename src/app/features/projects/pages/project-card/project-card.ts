import { Component, input, output } from '@angular/core';
import { IProject } from '../../models/iproject';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
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
