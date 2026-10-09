import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { AddProjectCard } from '../add-project-card/add-project-card';
import { IProject } from '../../models/iproject';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../service/project-service';
import { Noitems } from '../../../../shared/components/noitems/noitems';
import { Pagination } from '../../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-project',
  imports: [ProjectCard, AddProjectCard, RouterLink, Noitems,Pagination],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project implements OnInit {
  private projecttService = inject(ProjectService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  projects: WritableSignal<IProject[]> = signal<IProject[]>([]);
  selectedProject = signal<IProject | null>(null);
  currentPage = signal(1);
  pageSize = 3;

 
  ngOnInit(): void {
    this.GetAllProjects();
  }

  // get all projects
  GetAllProjects() {
    this.projecttService.getAllProjects().subscribe({
      next: (response) => {
        this.projects.set(response);
        console.log('projects', this.projects);
        
      
      },
      error: (error) => {
        console.error('Failed to load products', error);
      },
    });
  }

totalPages = computed(() =>
  Math.max(1, Math.ceil(this.projects().length / this.pageSize))
);

 paginatedProjects = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
console.log("paginated projects",this.projects().slice(start, start + this.pageSize))
    return  this.projects().slice(start, start + this.pageSize);
  });

  onPageChange(page: number): void {
    this.currentPage.set(page);

  }


}
