import {Component} from '@angular/core';
import {MessagesService} from "../../services/messages.service";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-show-messages',
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
  templateUrl: './show-messages.component.html',
  styleUrl: './show-messages.component.css'
})
export class ShowMessagesComponent {

  panelOpenState: boolean = false;

  constructor(private readonly messagesService: MessagesService) {
  }

  get messages() {
    return this.messagesService.messages;
  }
}
