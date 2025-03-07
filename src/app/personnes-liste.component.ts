import {Component} from '@angular/core';
import {Personne} from './personne';
import {PersonnesService} from './services/personnes.service';
import {MessagesService} from './services/messages.service';

@Component({
  selector: 'app-personnes-liste',
  imports: [],
  template: `
    <div>
      <button (click)="getPersonnes(0)">Trier par ID</button>
      <button (click)="getPersonnes(1)">Trier par Nom (A-Z)</button>
      <button (click)="getPersonnes(2)">Trier par Nom (Z-A)</button>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Plafond</th>
          <th>Dépenses</th>
        </tr>
        </thead>
        <tbody>
          @for (personne of personnes; track personne.id) {
            <tr>
              <td>{{ personne.id }}</td>
              <td>{{ personne.nom }}</td>
              <td>{{ personne.prenom }}</td>
              <td>{{ personne.plafond }}</td>
              <td>{{ getTotalDepenses(personne) }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }

    button {
      margin-bottom: 10px;
    }
  `
})
export class PersonnesListeComponent {
  personnes: Personne[] = [];

  constructor(private personnesService: PersonnesService, private messagesService: MessagesService) {
    this.personnes = personnesService.getPersonnes(0);
  }

  getPersonnes(sort: number) {
    this.personnes = this.personnesService.getPersonnes(sort);
    this.messagesService.clear()
    if (sort == 0) {
      this.messagesService.add('Tri par ID');
    } else if (sort == 1) {
      this.messagesService.add('Tri par Nom (A-Z)');
    } else {
      this.messagesService.add('Tri par Nom (Z-A)');
    }
  }

  getTotalDepenses(personne: Personne): number {
    return this.personnesService.totalDepenses(personne);
  }

}
