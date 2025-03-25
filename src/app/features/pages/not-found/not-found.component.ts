import { Component } from '@angular/core';
import { SubmitButtonComponent } from "../../../shared/components/ui/submit-button/submit-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [SubmitButtonComponent , RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
