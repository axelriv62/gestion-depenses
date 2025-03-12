import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgOptimizedImage
  ],
  template: `
    <img ngSrc="/antoine.png" alt="Antoine" height="261" width="396">
  `,
  styles: ``
})
export class DashboardComponent {

}
