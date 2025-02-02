import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {

  @Input() rating: number | undefined = 0;
  maxRating: number = 5;

  get fullStars(): number | undefined {
    return Math.floor(this.rating ?? 0);
  }

  get hasHalfStar(): boolean {
    return (this.rating ?? 0) % 1 !== 0;
  }

  get emptyStars(): number {
    return this.maxRating - Math.ceil(this.rating ?? 0);
  }

}
