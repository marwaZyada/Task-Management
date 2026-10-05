  import { inject, Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface App_Config {
  apiUrl: string;
  apiKey: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppConfig {






  private config: App_Config| null = null;
  private http=inject(HttpClient)

 constructor(){
  const backend = inject(HttpBackend);
     this.http = new HttpClient(backend);
 }

  async load(): Promise<void> {
    this.config = await firstValueFrom(
      this.http.get<App_Config>('config.json')
    );
      console.log('Config loaded:', this.config);
  }

  get apiUrl(): string {
     if (!this.config) {
      throw new Error('AppConfig has not been loaded yet.');
    }
    return this.config.apiUrl;
  }

  get apiKey(): string {
     if (!this.config) {
      throw new Error('AppConfig has not been loaded yet.');
    }
    return this.config.apiKey;
  }
}

