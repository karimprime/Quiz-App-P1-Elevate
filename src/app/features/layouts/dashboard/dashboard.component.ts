import { Component } from '@angular/core';
import { HomeComponent } from "../../pages/home/home.component";

@Component({
  selector: 'app-dashboard',
  imports: [HomeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
