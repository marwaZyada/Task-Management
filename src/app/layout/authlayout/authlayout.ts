import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Taskly } from '../../shared/components/taskly/taskly';

@Component({
  selector: 'app-authlayout',
  imports: [RouterOutlet, Taskly],
  templateUrl: './authlayout.html',
  styleUrl: './authlayout.css',
})
export class Authlayout {}
