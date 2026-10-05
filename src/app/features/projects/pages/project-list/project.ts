import { Component } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { AddProjectCard } from '../add-project-card/add-project-card';
import { IProject } from '../../models/iproject';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project',
  imports: [ProjectCard,AddProjectCard,RouterLink],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
   projects: IProject[] = [
    {
      name: 'Skyline Residence Phase II',
      description:
        'Structural review and aesthetic curation for the high-rise residential complex in the downtown district tes...',
      epics: 8,
      tasks: 24,
      members: 6,
      createdAt: '12 Oct 2025',
    },
    {
      name: 'Skyline Residence Phase II',
      description:
        'Structural review and aesthetic curation for the high-rise residential complex in the downtown district tes...',
      epics: 6,
      tasks: 18,
      members: 5,
      createdAt: '12 Oct 2025',
    },
    {
      name: 'Skyline Residence Phase II',
      description:
        'Structural review and aesthetic curation for the high-rise residential complex in the downtown district tes...',
      epics: 10,
      tasks: 32,
      members: 8,
      createdAt: '12 Oct 2025',
    },
    {
      name: 'Skyline Residence Phase II',
      description:
        'Structural review and aesthetic curation for the high-rise residential complex in the downtown district tes...',
      epics: 5,
      tasks: 15,
      members: 4,
      createdAt: '12 Oct 2025',
    },
    {
      name: 'Skyline Residence Phase II',
      description:
        'Structural review and aesthetic curation for the high-rise residential complex in the downtown district tes...',
      epics: 7,
      tasks: 20,
      members: 6,
      createdAt: '12 Oct 2025',
    },
  ];


}
