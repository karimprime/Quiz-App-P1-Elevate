import { Component, inject } from '@angular/core';
import { SubmitButtonComponent } from "../../../shared/components/ui/submit-button/submit-button.component";
import { Router } from '@angular/router';
import { AuthApiKpService } from 'auth-api-kp';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SubmitButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private authService = inject(AuthApiKpService);
  private router = inject(Router);
  isLoading = false;

// In your component
logout() {
  this.authService.logout().subscribe({
    next: (response) => {
      console.log(response.message);
      this.router.navigate(['/auth-layout/login']);
    },
    error: (err) => {
      console.error('Logout error:', err);
      this.router.navigate(['/auth-layout/login']); // Still navigate even on error
    }
  });
}
}
