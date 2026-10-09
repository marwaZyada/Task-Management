import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppConfig } from '../../../core/config/app-config';
import { IProjectRequest, IProject, Member } from '../models/iproject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly http = inject(HttpClient);
  private config = inject(AppConfig);

  //  create project
  createProject(project: IProjectRequest): Observable<IProject> {
    return this.http.post<IProject>(`${this.config.apiUrl}/rest/v1/projects`, project);
  }

  //  Edit project
  editProject(id: string, project: IProjectRequest): Observable<IProject> {
    return this.http.patch<IProject>(`${this.config.apiUrl}/rest/v1/projects?id=eq.${id}`, project);
  }

  // get all projects
  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.config.apiUrl}/rest/v1/rpc/get_projects`);
  }

  // get members
  getAllMembers(id:string): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.config.apiUrl}/rest/v1/get_project_members?project_id=eq.${id}`);
  }
}
