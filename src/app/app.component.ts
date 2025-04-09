import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MessagesService} from './services/messages.service';
import {ShowMessagesComponent} from './components/show-messages/show-messages.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShowMessagesComponent, MatToolbar, MatIcon, RouterLink, MatButton, RouterLinkActive],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion-depenses';
  auth = inject(AuthService);
  protected readonly AuthService = AuthService;

  constructor(public messagesService: MessagesService) {
    messagesService.add('Bonjour du composant app')
  }
}
