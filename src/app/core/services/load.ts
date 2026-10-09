import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Load {
  private requestCount = 0;

  private loadingSignal = signal(false);

  loading = this.loadingSignal.asReadonly();

  show(): void {
    this.requestCount++;
    this.loadingSignal.set(true);
  }

  hide(): void {
    this.requestCount--;

    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.loadingSignal.set(false);
    }
  }
}
