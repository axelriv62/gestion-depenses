import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PersonnesService} from '../../services/personnes.service';
import {DepensesService} from '../../services/depenses.service';
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
import {Depense} from '../../depense';
import {MessagesService} from '../../services/messages.service';

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
  templateUrl: './personnes-details.component.html',
  standalone: true,
  styleUrl: './personnes-details.component.css'
})
export class PersonnesDetailsComponent {
  @ViewChild(MatTable) table!: MatTable<Depense>
  id: number;
  columns = ['id', 'dd', 'nature', 'libelle', 'montant'];
  depenses: Depense[] = [];
  natures: string[] = ['Alimentaire', 'Loisirs', 'Voiture', 'Habitat', 'Sport', 'Vacances']

  constructor(private readonly route: ActivatedRoute, private readonly personnesService: PersonnesService, private readonly depensesService: DepensesService, private readonly messagesService: MessagesService) {
    this.id = +(this.route.snapshot.paramMap.get('id') ?? 1);
    this.depenses = depensesService.getDepensesOfPersonneId(this.id);
  }

  getPersonne() {
    return this.personnesService.getPersonne(this.id);
  }

  getDepensesOfPersonneId(sort?: number) {
    this.depenses = this.depensesService.getDepensesOfPersonneId(this.id, sort);
    this.messagesService.clear()
    this.table.renderRows()
    if (sort == 0) {
      this.messagesService.add('Tri par date');
    } else if (sort == 1) {
      this.messagesService.add('Tri par montant (décroissant)');
    } else {
      this.messagesService.add('Tri par nature et montant');
    }
  }

  filtreDepenses(filtre: Event) {
    let nature = (filtre.target as HTMLSelectElement).value;
    this.depenses = this.depensesService.filtreDepenses(this.id, nature);
    this.messagesService.clear()
    this.table.renderRows()
    if (nature !== '') {
      this.messagesService.add('Filtre par nature : ' + nature);
    }
  }
}

