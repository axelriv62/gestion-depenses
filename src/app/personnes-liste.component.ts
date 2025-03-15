import {Component, ViewChild} from '@angular/core';
import {Personne} from './personne';
import {PersonnesService} from './services/personnes.service';
import {MessagesService} from './services/messages.service';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-personnes-liste',
  imports: [
    MatIcon,
    RouterLink,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatTable,
    MatTableModule,
    NgClass,
  ],
  template: `
    <button (click)="getPersonnes(0)">Trier par ID</button>
    <button (click)="getPersonnes(1)">Trier par nom (A-Z)</button>
    <button (click)="getPersonnes(2)">Trier par Nom (Z-A)</button>
    <table mat-table [dataSource]="personnes">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let personne">{{ personne.id }}</td>
      </ng-container>
      <ng-container matColumnDef="nom">
        <th mat-header-cell *matHeaderCellDef>Nom</th>
        <td mat-cell *matCellDef="let personne">{{ personne.nom }}</td>
      </ng-container>
      <ng-container matColumnDef="prenom">
        <th mat-header-cell *matHeaderCellDef>Prénom</th>
        <td mat-cell *matCellDef="let personne">{{ personne.prenom }}</td>
      </ng-container>
      <ng-container matColumnDef="plafond">
        <th mat-header-cell *matHeaderCellDef>Plafond</th>
        <td mat-cell *matCellDef="let personne">{{ personne.plafond }}</td>
      </ng-container>
      <ng-container matColumnDef="depenses">
        <th mat-header-cell *matHeaderCellDef>Dépenses</th>
        <td mat-cell *matCellDef="let personne"
            [ngClass]="{'rouge': isOverPlafond(personne)}">{{ getTotalDepenses(personne) }}
        </td>
      </ng-container>
      <ng-container matColumnDef="details">
        <th mat-header-cell *matHeaderCellDef>Action</th>
        <td mat-cell *matCellDef="let element">
          <mat-icon [routerLink]="['/personnes', element.id]">loupe</mat-icon>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns;"></tr>

    </table>
  `,
  styles: ``
})
export class PersonnesListeComponent {
  @ViewChild(MatTable) table!: MatTable<Personne>
  personnes: Personne[] = [];
  columns = ['id', 'nom', 'prenom', 'plafond', 'depenses', 'details'];

  constructor(private readonly personnesService: PersonnesService, private readonly messagesService: MessagesService) {
    this.personnes = personnesService.getPersonnes(0);
  }

  getPersonnes(sort: number) {
    this.personnes = this.personnesService.getPersonnes(sort);
    this.table.renderRows()
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

  isOverPlafond(personne: Personne): boolean {
    return this.personnesService.totalDepenses(personne) > personne.plafond;
  }

}
