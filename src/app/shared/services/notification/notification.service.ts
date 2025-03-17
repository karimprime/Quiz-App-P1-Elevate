import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notyf: Notyf | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Initialize Notyf only in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf({
        duration: 5000,
        position: {
          x: 'right',
          y: 'bottom',
        },
        types: [
          {
            type: 'primary',
            background: 'green',
            icon: {
              className: 'icon-[tabler--circle-check]',
              tagName: 'i',
            },
          },
          {
            type: 'warning',
            background: 'red',
            icon: {
              className: 'icon-[tabler--circle-check]',
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
