import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiKpService } from 'auth-api-kp';

interface Card {
  id: string;
  image: string;
  altText: string;
  title: string;
  subtitle: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  cards: Card[] = [
    {
      id: '1',
      image: 'https://cdn.flyonui.com/fy-assets/components/card/image-5.png',
      altText: 'Front-end development concepts',
      title: 'Front-End Web Developer',
      subtitle: 'Voluptatem aut ut dignissimos blanditiis'
    },
  ];

}
