import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Notyf } from 'notyf'; // Import Notyf

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notyf: Notyf | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Initialize Notyf only in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf({
        duration: 5000, // Notification duration in milliseconds
        position: {
          x: 'right', // Horizontal position (left, center, right)
          y: 'top', // Vertical position (top, bottom)
        },
        types: [
          {
            type: 'primary',
            background: 'green', // Tailwind CSS green color
            icon: {
              className: 'icon-[tabler--circle-check]', // FlyonUI icon
              tagName: 'i',
            },
          },
          {
            type: 'warning',
            background: 'red', // Tailwind CSS green color
            icon: {
              className: 'icon-[tabler--circle-check]', // FlyonUI icon
              tagName: 'i',
            },
          },
        ],
      });
    }
  }

  // Show a success notification
  success(message: string): void {
    if (this.notyf) {
      this.notyf.success(message);
    }
  }

  // Show an error notification
  error(message: string): void {
    if (this.notyf) {
      this.notyf.error(message);
    }
  }
}
