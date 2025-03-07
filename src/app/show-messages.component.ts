import {Component} from '@angular/core';
import {MessagesService} from "./services/messages.service";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-show-messages',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatList,
    MatListItem,
    MatIcon
  ],
  template: `
    <mat-accordion>
      <mat-expansion-panel (opened)="panelOpenState = true"
                           (closed)="panelOpenState = false">
        <mat-expansion-panel-header>
          <mat-panel-title>
            Messages de l'application
          </mat-panel-title>
          <mat-panel-description>
            {{panelOpenState ? 'Cacher les messages' : 'Voir les messages'}}
          </mat-panel-description>
        </mat-expansion-panel-header>
        <mat-list>
          @for(msg of messages; track msg) {
            <mat-list-item>
              <mat-icon>label</mat-icon>
              <div matListItemLine>{{msg}}</div>
            </mat-list-item>
          }

        </mat-list>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: ``
})
export class ShowMessagesComponent {

  panelOpenState: boolean = false;

  constructor(private messagesService: MessagesService) {
  }

  get messages() {
    return this.messagesService.messages;
  }
}
