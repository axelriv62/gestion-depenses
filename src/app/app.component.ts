import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Personne} from './personne'
import {Datas} from './mock-datas';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion-depenses';
  personnes: Personne[];

  constructor() {
    const datas = Datas.getInstance();
    this.personnes = datas.generePersonnes();
  }
}
