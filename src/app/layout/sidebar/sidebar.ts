import { Component, inject, signal } from '@angular/core';
import { Taskly } from '../../shared/components/taskly/taskly';
import { SIDEBAR_ITEMS } from './sidebar-menu';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-sidebar',
  imports: [Taskly,RouterLink,RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authService=inject(Auth)
  private router=inject(Router)
   sidebarItems = SIDEBAR_ITEMS;
     isCollapsed = signal(false);


       toggleSidebar(): void {
    this.isCollapsed.update(value => !value);
  }


  logout(): void {
  this.authService.signout().subscribe({
    next: () => {
      this.authService.clearStorage();
      this.router.navigate(['/auth/login']);
    },

    error: error => {
      console.error('Logout failed:', error);
this.authService.clearStorage();
      this.router.navigate(['/auth/login']);
    },
  });
}
}
