import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss'
})
export class AuthNavbarComponent {
  isNavOpen = false;
  isDropdownOpen = false;

  // Toggle mobile navigation menu
  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  // Toggle language dropdown
  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Handle language change
  changeLanguage(language: string): void {
    console.log(`Language changed to ${language}`);
    this.isDropdownOpen = false;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!(event.target as HTMLElement).closest('.dropdown')) {
      this.isDropdownOpen = false;
    }
  }
}
