import { Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-submit-button',
imports:[CommonModule],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.scss'
})
export class SubmitButtonComponent {
  @Input({ required: true }) text!: string;
  @Input() type: 'submit' | 'button' | 'reset' = 'submit';
  @Input() variant = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() icon?: string;
  @Input() loadingText?: string;
  @Input() ariaLive: 'polite' | 'assertive' | 'off' = 'polite';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) isLoading = false;
  @Input({ transform: booleanAttribute }) fullWidth = true;

  @Output() onClick = new EventEmitter<Event>();

  getButtonClasses(): string {
    const commonClasses = 'flex items-center justify-center gap-2 transition-colors duration-200 rounded-2xl focus:outline-none focus:ring-2';
    const sizeClasses = {
      sm: 'py-1 px-3 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-3 px-6 text-lg'
    }[this.size];
    const variantClasses = {
      primary: 'bg-colorNavLink text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-900',
    }[this.variant];
    const fullWidthClass = this.fullWidth ? 'w-full' : '';

    return [commonClasses, sizeClasses, variantClasses, fullWidthClass].filter(Boolean).join(' ');
  }
}
