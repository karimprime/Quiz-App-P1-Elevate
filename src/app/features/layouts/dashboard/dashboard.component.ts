
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { AuthApiKpService } from 'auth-api-kp';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, RouterLinkActive , FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private authService = inject(AuthApiKpService);
  private router = inject(Router);

  isLoading = false;
  isSidebarOpen = false;
  searchExpanded = false;
  searchQuery = '';

    searchControl = new FormControl('');

  isLinkActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleSearch() {
    this.searchExpanded = !this.searchExpanded;
    if (this.searchExpanded) {
      setTimeout(() => {
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
          (searchInput as HTMLElement).focus();
        }
      }, 100);
    }
  }

  expandSearch() {
    this.searchExpanded = true;
  }

  collapseSearch() {
    if (!this.searchQuery) {
      this.searchExpanded = false;
    }
  }

  logout() {
    this.isLoading = true;
    this.authService.logout().subscribe({
      next: (response) => {
        console.log(response.message);
        localStorage.removeItem('userToken');
        this.router.navigate(['/auth-layout/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
        this.router.navigate(['/auth-layout/login']);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
