import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PersonnesService} from './services/personnes.service';
import {DepensesService} from './services/depenses.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import {Depense} from './depense';
import {MessagesService} from './services/messages.service';

@Component({
  selector: 'app-personnes-details',
  imports: [
    MatTable,
    MatTableModule,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  template: `
    <div>
      <p>Nom : {{ getPersonne().nom }} </p>
      <p>Prénom : {{ getPersonne().prenom }}</p>
      <p>Plafond : {{ getPersonne().plafond }}</p>
    </div>
    <button (click)="getDepensesOfPersonneId(0)">Trier par date</button>
    <button (click)="getDepensesOfPersonneId(1)">Trier par montant (décroissant)</button>
    <button (click)="getDepensesOfPersonneId(2)">Trier par nature et montant</button>
    <table mat-table [dataSource]="depenses">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let depense">{{ depense.id }}</td>
      </ng-container>
      <ng-container matColumnDef="dd">
        <th mat-header-cell *matHeaderCellDef>Date</th>
        <td mat-cell *matCellDef="let depense">{{ depense.dd }}</td>
      </ng-container>
      <ng-container matColumnDef="nature">
        <th mat-header-cell *matHeaderCellDef>Nature</th>
        <td mat-cell *matCellDef="let depense">{{ depense.nature }}</td>
      </ng-container>
      <ng-container matColumnDef="libelle">
        <th mat-header-cell *matHeaderCellDef>Libelle</th>
        <td mat-cell *matCellDef="let depense">{{ depense.libelle }}</td>
      </ng-container>
      <ng-container matColumnDef="montant">
        <th mat-header-cell *matHeaderCellDef>Montant</th>
        <td mat-cell *matCellDef="let depense">{{ depense.montant }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns;"></tr>

    </table>
  `,
  styles: ``
})
export class PersonnesDetailsComponent {
  @ViewChild(MatTable) table!: MatTable<Depense>
  id: number;
  columns = ['id', 'dd', 'nature', 'libelle', 'montant'];
  depenses: Depense[] = [];

  constructor(private route: ActivatedRoute, private personnesService: PersonnesService, private depensesService: DepensesService, private messagesService: MessagesService) {
    this.id = +(this.route.snapshot.paramMap.get('id') || 1);
    this.depenses = depensesService.getDepensesOfPersonneId(this.id);
  }

  getPersonne() {
    return this.personnesService.getPersonne(this.id);
  }

  getDepensesOfPersonneId(sort?: number) {
    this.depenses = this.depensesService.getDepensesOfPersonneId(this.id, sort);
    this.messagesService.clear()
    if (sort == 0) {
      this.messagesService.add('Tri par date');
    } else if (sort == 1) {
      this.messagesService.add('Tri par montant (décroissant)');
    } else {
      this.messagesService.add('Tri par nature et montant');
    }
    this.table.renderRows()
  }

}
