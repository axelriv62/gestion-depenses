import {Component, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {Personne} from '../../personne';
import {PersonnesService} from '../../services/personnes.service';
import {MessagesService} from '../../services/messages.service';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, RouterLink} from '@angular/router';
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
import {noop, Subscription} from 'rxjs';

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
  templateUrl: './personnes-liste.component.html',
  standalone: true,
  styleUrl: './personnes-liste.component.css'
})
export class PersonnesListeComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table!: MatTable<Personne>
  personnes = signal<Personne[]>([]);
  columns = ['id', 'nom', 'prenom', 'plafond', 'depenses', 'details'];
  horsLimite: boolean = false;
  queryParamSubscription!: Subscription;
  totalDepensesCache: { [key: number]: number } = {};
  isOverPlafondCache: { [key: number]: boolean } = {};

  constructor(private readonly personnesService: PersonnesService, private readonly messagesService: MessagesService, private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.queryParamSubscription = this.route.queryParamMap.subscribe(params => {
      this.horsLimite = params.get('horsLimite') === 'true';
      this.getPersonnes(0).then(noop)
    });
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

  async getPersonnes(sort: number) {
    try {
      let personnes = await this.personnesService.getPersonnes(sort);

      for (const personne of personnes) {
        this.totalDepensesCache[personne.id] = await this.getTotalDepenses(personne);
        this.isOverPlafondCache[personne.id] = await this.isOverPlafond(personne);
      }

      if (this.horsLimite) {
        personnes = personnes.filter(personne => this.isOverPlafondCache[personne.id]);
        this.table.renderRows()
      }

      this.personnes.set(personnes);

      if (sort == 0) {
        this.messagesService.add('Tri par ID');
      } else if (sort == 1) {
        this.messagesService.add('Tri par Nom (A-Z)');
      } else {
        this.messagesService.add('Tri par Nom (Z-A)');
      }

    } catch (error) {
      this.messagesService.add("Erreur lors du chargement des personnes");
    }
  }

  async getTotalDepenses(personne: Personne): Promise<number> {
    if (this.totalDepensesCache[personne.id] !== undefined) {
      return this.totalDepensesCache[personne.id];
    }
    try {
      const total = await this.personnesService.totalDepenses(personne);
      this.totalDepensesCache[personne.id] = total;
      return total;
    } catch (error) {
      this.messagesService.add("Erreur lors du calcul du total des dépenses de la personne " + personne.nom);
      return -1;
    }
  }

  async isOverPlafond(personne: Personne): Promise<boolean> {
    if (this.isOverPlafondCache[personne.id] !== undefined) {
      return this.isOverPlafondCache[personne.id];
    }
    try {
      const totalDepenses = await this.getTotalDepenses(personne);
      const isOver = totalDepenses > personne.plafond;
      this.isOverPlafondCache[personne.id] = isOver;
      return isOver;
    } catch (error) {
      this.messagesService.add("Erreur lors du calcul du plafond de la personne : " + personne.nom);
      return false;
    }
  }

}
