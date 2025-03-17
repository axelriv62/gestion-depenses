import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgOptimizedImage
  ],
  template: `
    <div class="image-container">
      <img ngSrc="/antoine.png" alt="Antoine" height="261" width="396">
    </div>
  `,
  styles: [`
    .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100vw;
    }

  `]
})
export class DashboardComponent {

}
