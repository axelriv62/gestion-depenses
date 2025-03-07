import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MessagesService} from './services/messages.service';
import {ShowMessagesComponent} from './show-messages.component';
import {PersonnesListeComponent} from './personnes-liste.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShowMessagesComponent, PersonnesListeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion-depenses';

  constructor(public messagesService: MessagesService) {
    messagesService.add('Bonjour du composant app')
  }
}
