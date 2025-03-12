import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MessagesService} from './services/messages.service';
import {ShowMessagesComponent} from './show-messages.component';
import {PersonnesListeComponent} from './personnes-liste.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShowMessagesComponent, PersonnesListeComponent, MatToolbar, MatIcon, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion-depenses';

  constructor(public messagesService: MessagesService) {
    messagesService.add('Bonjour du composant app')
  }
}
