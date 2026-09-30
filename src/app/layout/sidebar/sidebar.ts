import { Component, inject, signal } from '@angular/core';
import { Taskly } from '../../shared/components/taskly/taskly';
import { SIDEBAR_ITEMS } from './sidebar-menu';
import {  Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [Taskly, RouterLink, RouterLinkActive,CommonModule ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authService=inject(Auth)
  private router=inject(Router)
  isLoggingOut = signal(false);
   sidebarItems = SIDEBAR_ITEMS;
     isCollapsed = signal(false);
isOpen = false;

       toggleSidebar(): void {
    this.isCollapsed.update(value => !value);
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

    error: error => {
       this.isLoggingOut.set(false);
      console.error('Logout failed:', error);

    },
  });
}
}
