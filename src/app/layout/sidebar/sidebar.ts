import { Component, signal } from '@angular/core';
import { Taskly } from '../../shared/components/taskly/taskly';
import { SIDEBAR_ITEMS } from './sidebar-menu';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [Taskly,RouterLink,RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
   sidebarItems = SIDEBAR_ITEMS;
     isCollapsed = signal(false);

       toggleSidebar(): void {
    this.isCollapsed.update(value => !value);
  }
}
