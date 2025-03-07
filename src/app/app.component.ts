import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Personne} from './personne'
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

  constructor(public messagesService: MessagesService) {
    messagesService.add('Bonjour du composant app')
  }
}
