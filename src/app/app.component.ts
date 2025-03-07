import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Personne} from './personne'
import {Datas} from './mock-datas';
import {MessagesService} from './services/messages.service';
import {ShowMessagesComponent} from './show-messages.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShowMessagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion-depenses';
  personnes: Personne[];

  constructor(public messagesService: MessagesService) {
    const datas = Datas.getInstance();
    this.personnes = datas.generePersonnes();
    messagesService.add('Bonjour du composant app')
  }
}
