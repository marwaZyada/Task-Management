import { Component, inject, input, output, signal } from '@angular/core';
import { Taskly } from '../../shared/components/taskly/taskly';
import { SIDEBAR_ITEMS } from './sidebar-menu';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [Taskly, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authService = inject(Auth);
  private router = inject(Router);
  isLoggingOut = signal(false);
  sidebarItems = SIDEBAR_ITEMS;
  isCollapsed = signal(false);
  menushow=input(false)
  closeSidebar = output<void>();
  isOpen = false;

constructor(){
    
  this.updateProjectMenu(this.router.url);

 // change route   
 this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        this.updateProjectMenu(event.urlAfterRedirects);
      });
  }


  // collapse
  toggleSidebar(): void {
    this.isCollapsed.update((value) => !value);
  }

  // close side bar
  onClose() {
    this.closeSidebar.emit();
  }

  logout(): void {
    if (this.isLoggingOut()) {
      return;
    }

    this.isLoggingOut.set(true);
    this.authService.signout().subscribe({
      next: () => {
        this.authService.clearStorage();
        this.router.navigate(['/auth/login']);
      },

      error: (error) => {
        if (error.error.code == 403) {
            this.isLoggingOut.set(true);
          this.authService.clearStorage();
          this.router.navigate(['/auth/login']);
        }
        this.isLoggingOut.set(false);
        console.error('Logout failed:', error);
      },
    });
  }




  private updateProjectMenu(url: string): void {
    this.isOpen = url.startsWith('/project');
  }
}
