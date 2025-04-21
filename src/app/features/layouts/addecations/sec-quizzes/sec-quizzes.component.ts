import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Card {
  id: string;
  image: string;
  altText: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-sec-quizzes',
  imports: [RouterLink],
  templateUrl: './sec-quizzes.component.html',
  styleUrl: './sec-quizzes.component.scss'
})
export class SecQuizzesComponent {
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
