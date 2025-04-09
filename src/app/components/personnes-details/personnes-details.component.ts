import {Component, inject, signal, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PersonnesService} from '../../services/personnes.service';
import {DepensesService} from '../../services/depenses.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import {Depense} from '../../depense';
import {MessagesService} from '../../services/messages.service';
import {Personne} from '../../personne';
import {DepenseDialogFormComponent} from '../depense-dialog-form/depense-dialog-form.component';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {noop} from 'rxjs';

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
    MatRow,
    MatRowDef,
    MatIcon
  ],
  templateUrl: './personnes-details.component.html',
  styleUrl: './personnes-details.component.css'
})
export class PersonnesDetailsComponent {
  @ViewChild(MatTable) table!: MatTable<Depense>
  id: number;
  columns = ['id', 'dd', 'nature', 'libelle', 'montant', 'edit'];
  depenses = signal<Depense[]>([]);
  depense = signal<Depense | null>(null);
  natures: string[] = ['Alimentaire', 'Loisirs', 'Voiture', 'Habitat', 'Sport', 'Vacances']
  personne!: Personne;
  private readonly dialog: any;

  constructor(private readonly route: ActivatedRoute, private readonly personnesService: PersonnesService, private readonly depensesService: DepensesService, private readonly messagesService: MessagesService) {
    this.id = +(this.route.snapshot.paramMap.get('id') ?? 1);
    this.dialog = inject(MatDialog);
  }

  ngOnInit() {
    this.getPersonne().then(() => this.getDepensesOfPersonneId(0))
  }

  async getPersonne() {
    try {
      this.personne = await this.personnesService.getPersonne(this.id)
    } catch (error) {
      this.messagesService.add("Erreur lors du chargement de la personne avec l'id " + this.id);
    }
  }

  async getDepensesOfPersonneId(sort: number) {
    try {
      const depenses = await this.depensesService.getDepensesOfPersonneId(this.id, sort);
      this.depenses.set(depenses)

      if (sort == 0) {
        this.messagesService.add('Tri par date');
      } else if (sort == 1) {
        this.messagesService.add('Tri par montant (décroissant)');
      } else {
        this.messagesService.add('Tri par nature et montant');
      }

    } catch (error) {
      this.messagesService.add("Erreur lors du chargement des dépenses de la personne avec l'id " + this.id);
    }
  }

  async filtreDepenses(filtre: Event) {
    let nature = (filtre.target as HTMLSelectElement).value;
    try {
      this.depenses.set(await this.depensesService.filtreDepenses(this.id, nature));
      this.table.renderRows()
      if (nature !== '') {
        this.messagesService.add('Filtre par nature : ' + nature);
      }
    } catch (error) {
      this.messagesService.add("Erreur lors du filtrage des dépenses de la personne avec l'id " + this.id);
    }
  }

  async loadDepenseOfId(id: number) {
    const depense$ = await this.depensesService.getDepense(id)
    this.depense.set(depense$.data.depense)
  }

  async editDepense(id: number) {
    await this.loadDepenseOfId(id).then(noop);
    let dialogRef = this.dialog.open(DepenseDialogFormComponent, {
      maxWidth: '800px',
      data: {
        msg: `Modification d'une dépense de ${this.personne.prenom} ${this.personne.nom}`,
        depense: this.depense()
      },
    });
    dialogRef.afterClosed().subscribe(async (result: Depense) => {
      if (result) {
        console.log(result);
        const depense = await this.depensesService.updateDepense(result);
        await this.getPersonne();
        await this.getDepensesOfPersonneId(depense.personneId);
      }
    });
  }

  async addDepense() {
    let dialogRef = this.dialog.open(DepenseDialogFormComponent, {
      maxWidth: '800px',
      data: {
        msg: `Modification d'une dépense de ${this.personne.prenom} ${this.personne.nom}`,
        depense: this.depense()
      },
    });
    dialogRef.afterClosed().subscribe(async (result: Depense) => {
      if (result) {
        console.log(result);
        result.personneId = <number>this.depense()?.personneId
        const depense = await this.depensesService.createDepense(result);
        await this.getPersonne();
        await this.getDepensesOfPersonneId(depense.personneId);
      }
    });
  }
}

