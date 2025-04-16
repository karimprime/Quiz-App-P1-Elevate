import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { AuthApiKpService } from 'auth-api-kp';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private authService = inject(AuthApiKpService);
  private router = inject(Router);

  isLoading = false;
  isSidebarOpen = false;



  isLinkActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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
