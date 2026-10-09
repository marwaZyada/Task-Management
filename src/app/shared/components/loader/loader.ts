import { Component, inject } from '@angular/core';
import { Load } from '../../../core/services/load';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  protected loadingService = inject(Load);
}
