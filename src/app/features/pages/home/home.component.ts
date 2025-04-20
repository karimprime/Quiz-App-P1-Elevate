import { Component } from '@angular/core';
import { SecUserDataComponent } from "../../layouts/addecations/sec-user-data/sec-user-data.component";
import { SecQuizzesComponent } from "../../layouts/addecations/sec-quizzes/sec-quizzes.component";


@Component({
  selector: 'app-home',
  imports: [SecUserDataComponent, SecQuizzesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {



}
