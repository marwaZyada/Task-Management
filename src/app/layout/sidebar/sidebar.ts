import { Component, inject, input, model, OnInit, output, signal } from '@angular/core';
import { Taskly } from '../../shared/components/taskly/taskly';
import { SIDEBAR_ITEMS } from './sidebar-menu';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  imports: [Taskly, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  private authService = inject(Auth);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isLoggingOut = signal(false);
  sidebarItems = SIDEBAR_ITEMS;
  isCollapsed = signal(false);
  menushow = model(false);
  closeSidebar = output<void>();
  isOpen = false;
  isiconshow = signal(false);
  private breakpointObserver = inject(BreakpointObserver);
  isIconChange = output<boolean>();

  ngOnInit(): void {
    console.log(this.isiconshow());
    console.log("activated route",this.router.url.split('/')[3])
    this.updateProjectMenu(this.router.url);
    this.breakpointObserver.observe('(max-width: 767px)').subscribe((result) => {
      if (result.matches) {
        this.isCollapsed.set(false);
        this.menushow.set(false);
      }

      this.menushow.set(true);
    });

    // change route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('event', event);
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
        this.router.navigate(['/auth/login']);
        this.authService.clearStorage();
      },

      error: (error) => {
        if (error.error.code == 403) {
          this.isLoggingOut.set(true);
          this.router.navigate(['/auth/login']);
          this.authService.clearStorage();
        }
        this.isLoggingOut.set(false);
        console.error('Logout failed:', error);
      },
    });
  }

  private updateProjectMenu(url: string): void {
    this.isOpen = url.startsWith('/project');
  }

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  toggleProjectMenu(): void {
    this.isiconshow.set(true);
    this.isOpen = true;
    console.log('show', this.isiconshow());
    console.log('menu', this.menushow());
    this.isIconChange.emit(this.isiconshow());
  }

  
  get activeSection(): string {
  return this.router.url.split('/')[3] ?? '';
}
}
