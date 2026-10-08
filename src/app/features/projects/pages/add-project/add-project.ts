import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Card } from '../../../../shared/components/card/card';
import { ProjectService } from '../../service/project-service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProjectRequest } from '../../models/iproject';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule, Card, CommonModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly location = inject(Location);
  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);
  private readonly activeroute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  // ================= STATE =================

  isLoading = false;

  errorMessage = '';
  projectId: string | null = null;

  ngOnInit(): void {
    this.projectId = this.activeroute.snapshot.paramMap.get('id');

    console.log('Project ID:', this.projectId);
    if (this.projectId) {
      this.getProjectById(this.projectId);
    }
  }

  // ================= FORM =================

  readonly projectForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],

    description: ['', [Validators.maxLength(500)]],
  });

  // ================= GETTERS =================

  get name() {
    return this.projectForm.controls.name;
  }

  get description() {
    return this.projectForm.controls.description;
  }

  // ================= SUBMIT =================

  save(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();

      return;
    }

    this.isLoading = true;

    this.errorMessage = '';

    const payload: IProjectRequest = this.projectForm.getRawValue();

    console.log('form', payload);
    console.log(this.projectId ? 'Update Project:' : 'Create Project:', payload);

    const request = this.projectId
      ? this.projectService.editProject(this.projectId, payload)
      : this.projectService.createProject(payload);

    request.subscribe({
      next: () => {
        this.isLoading = false;
        if (this.projectId) {
          this.toastr.success('Project updated successfully', 'Success');
        } else {
          this.toastr.success('Project created successfully', 'Success');
        }
        this.router.navigate(['/project']);
      },

      error: (error) => {
        this.isLoading = false;
        const action = this.projectId ? 'update' : 'create';

        const apiMessage = error?.error?.message ?? 'Please try again later.';

        this.errorMessage = `Failed to ${action} project: ${apiMessage}`;
        
      },
    });
  }

  // ================= NAVIGATION =================

  goBack(): void {
    this.location.back();
  }

  // ================= Load project =================
  getProjectById(id: string) {
    this.projectService.getAllProducts().subscribe({
      next: (response) => {
        const project = response.find((pro) => pro?.id === id);

        if (!project) {
          this.errorMessage = 'Project not found';
          return;
        }

        this.projectForm.patchValue({
          name: project.name,
          description: project.description,
        });
      },

      error: (error) => {
        this.errorMessage = error.error.message;
        console.log(error.error.message);
      },
    });
  }
}
