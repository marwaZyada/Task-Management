import { Component, inject, OnInit, signal,  WritableSignal } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { AddProjectCard } from '../add-project-card/add-project-card';
import { IProject } from '../../models/iproject';
import { Router, RouterLink } from '@angular/router';
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
  private router=inject(Router)
   projects: WritableSignal<IProject[]> = signal<IProject[]>([]);
   selectedProject = signal<IProject | null>(null);

    ngOnInit(): void {
    this.GetAllProjects()
  }


  // get all projects 
  GetAllProjects()
{  this.projecttService.getAllProducts().subscribe({
      next: (response) => {
     
        this.projects.set( response);
        console.log("projects",this.projects)
      },
      error: (error) => {
        console.error('Failed to load products', error);
      },
    });
  }
editProject(project: IProject) {
  this.selectedProject.set(project);
 console.log("edit project",this.selectedProject())
this.router.navigate(['/project', this.selectedProject()?.id, 'edit']);
}

}
