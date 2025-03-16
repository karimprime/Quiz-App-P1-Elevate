import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss'
})
export class AuthNavbarComponent {
  isNavOpen = false;
  isDropdownOpen = false;

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  changeLanguage(language: string): void {
    console.log(`Language changed to ${language}`);
    this.isDropdownOpen = false;
  }
}
