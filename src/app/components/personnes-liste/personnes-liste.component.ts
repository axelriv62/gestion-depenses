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

  // comme dans le sujet
  ngOnInit() {
    this.queryParamSubscription = this.route.queryParamMap.subscribe(params => {
      console.log("appel de ngOnInit dans le composant personnes-liste");
      this.horsLimite = params.get('horsLimite') === 'true';
      this.getPersonnes(0).then(noop)
    });
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

  // comme dans le sujet
  async getPersonnes(sort: number) {
    console.log("appel de getPersonnes dans le composant personnes-liste");

    try {
      let personnes = await this.personnesService.getPersonnes(sort);
      console.log("let personnes : " + personnes);

      for (const personne of personnes) {
        this.totalDepensesCache[personne.id] = await this.getTotalDepenses(personne);
        this.isOverPlafondCache[personne.id] = await this.isOverPlafond(personne);
      }

      if (this.horsLimite) {
        personnes = personnes.filter(personne => this.isOverPlafondCache[personne.id]);
        console.log("personnes filter : " + personnes);
        this.table.renderRows()
      }

      this.personnes.set(personnes);

      this.messagesService.clear()
      if (sort == 0) {
        this.messagesService.add('Tri par ID');
      } else if (sort == 1) {
        this.messagesService.add('Tri par Nom (A-Z)');
      } else {
        this.messagesService.add('Tri par Nom (Z-A)');
      }

    } catch (error) {
      this.messagesService.add("Erreur lors du chargement des personnes:" + error);
    }
  }

  async getTotalDepenses(personne: Personne): Promise<number> {
    console.log("appel de getTotalDepenses dans le composant personnes-liste pour la personne " + personne.id);
    if (this.totalDepensesCache[personne.id] !== undefined) {
      return this.totalDepensesCache[personne.id];
    }
    const total = await this.personnesService.totalDepenses(personne);
    this.totalDepensesCache[personne.id] = total;
    return total;
  }

  async isOverPlafond(personne: Personne): Promise<boolean> {
    console.log("appel de isOverPlafond dans le composant personnes-liste pour la personne " + personne.id);
    if (this.isOverPlafondCache[personne.id] !== undefined) {
      return this.isOverPlafondCache[personne.id];
    }
    const totalDepenses = await this.getTotalDepenses(personne);
    const isOver = totalDepenses > personne.plafond;
    this.isOverPlafondCache[personne.id] = isOver;
    return isOver;
  }

}
