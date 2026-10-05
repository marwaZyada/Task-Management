import { Component, inject, OnInit } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { AddProjectCard } from '../add-project-card/add-project-card';
import { IProject } from '../../models/iproject';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../service/project-service';
import { Noitems } from '../../../../shared/components/noitems/noitems';

@Component({
  selector: 'app-project',
  imports: [ProjectCard,AddProjectCard,RouterLink,Noitems],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project implements OnInit {
  private projecttService=inject(ProjectService)
   projects!: IProject[] 

    ngOnInit(): void {
    this.GetAllProjects()
  }


  // get all projects 
  GetAllProjects()
{  this.projecttService.getAllProducts().subscribe({
      next: (response) => {
     
        this.projects = response;
        console.log("projects",this.projects)
      },
      error: (error) => {
        console.error('Failed to load products', error);
      },
    });
  }


}
