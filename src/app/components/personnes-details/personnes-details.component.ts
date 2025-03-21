import {Component, signal, ViewChild} from '@angular/core';
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
import {Personne} from '../../personne';

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
  styleUrl: './personnes-details.component.css'
})
export class PersonnesDetailsComponent {
  @ViewChild(MatTable) table!: MatTable<Depense>
  id: number;
  columns = ['id', 'dd', 'nature', 'libelle', 'montant'];
  depenses = signal<Depense[]>([]);
  natures: string[] = ['Alimentaire', 'Loisirs', 'Voiture', 'Habitat', 'Sport', 'Vacances']
  personne!: Personne;

  constructor(private route: ActivatedRoute, private personnesService: PersonnesService, private depensesService: DepensesService, private messagesService: MessagesService) {
    this.id = +(this.route.snapshot.paramMap.get('id') || 1);
  }

  ngOnInit() {
    console.log("appel de ngOnInit dans le composant personnes-details pour la personne " + this.id);
    this.getPersonne().then(() => this.getDepensesOfPersonneId(0))
  }

  async getPersonne() {
    console.log("appel de getPersonne dans le composant personnes-details pour la personne " + this.id);
    this.personne = await this.personnesService.getPersonne(this.id)
  }

  async getDepensesOfPersonneId(sort: number) {
    console.log("appel de getDepensesOfPersonneId dans le composant personnes-details pour la personne " + this.id);

    try {
      const depenses = await this.depensesService.getDepensesOfPersonneId(this.id, sort);
      this.depenses.set(depenses)

      this.messagesService.clear()
      if (sort == 0) {
        this.messagesService.add('Tri par date');
      } else if (sort == 1) {
        this.messagesService.add('Tri par montant (décroissant)');
      } else {
        this.messagesService.add('Tri par nature et montant');
      }

    } catch (error) {
      this.messagesService.add("Erreur lors du chargement des dépenses:" + error);
    }
  }

  async filtreDepenses(filtre: Event) {
    let nature = (filtre.target as HTMLSelectElement).value;
    this.depenses.set(await this.depensesService.filtreDepenses(this.id, nature));
    this.messagesService.clear()
    this.table.renderRows()
    if (nature !== '') {
      this.messagesService.add('Filtre par nature : ' + nature);
    }
  }
}

