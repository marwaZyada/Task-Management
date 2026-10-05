  import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Card } from '../../../../shared/components/card/card';
import {  ProjectService } from '../../service/project-service';
import { Router } from '@angular/router';
import { IProjectRequest } from '../../models/iproject';



@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule,Card,CommonModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {


  private readonly fb = inject(FormBuilder);
  private readonly location = inject(Location);
    private readonly projectService = inject(ProjectService);
     private readonly router = inject(Router);


  // ================= STATE =================

  isLoading = false;

  errorMessage = '';


  // ================= FORM =================

  readonly projectForm = this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
    ],

    description: [
      '',
      [
        Validators.maxLength(500),
      ],
    ],
  });


  // ================= GETTERS =================

  get name() {
    return this.projectForm.controls.name;
  }

  get description() {
    return this.projectForm.controls.description;
  }


  // ================= SUBMIT =================

  createProject(): void {

    if (this.projectForm.invalid) {

      this.projectForm.markAllAsTouched();

      return;
    }


    this.isLoading = true;

    this.errorMessage = '';


    const payload:IProjectRequest = this.projectForm.getRawValue();

    console.log('Create Project:', payload);


  
    this.projectService.createProject(payload).subscribe({

      next: () => {
        this.isLoading = false;

        this.router.navigate(['/project']);
      },

      error: (error) => {
        this.isLoading = false;

        this.errorMessage =
          error?.error?.message ??
          'Failed To Add New Project, Try Again Later';
      }

    });
   

  }


  // ================= NAVIGATION =================

  goBack(): void {
    this.location.back();
  }

}

