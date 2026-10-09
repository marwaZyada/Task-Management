import { Component, input} from '@angular/core';
import { IProject } from '../../models/iproject';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-project-card',
  imports: [DatePipe,RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input<IProject>();
 


 
 


}
