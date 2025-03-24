import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: string[] = [];

  add(message: string): void {
    this.clear();
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }

  isEmpty(): boolean {
    return this.messages.length === 0;
  }
}
