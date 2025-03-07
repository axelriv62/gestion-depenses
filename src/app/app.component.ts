import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Personne} from './personne'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion-depenses';
}
