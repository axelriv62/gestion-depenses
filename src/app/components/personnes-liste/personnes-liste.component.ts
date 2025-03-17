import {Component, ViewChild} from '@angular/core';
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
import {Subscription} from 'rxjs';

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
export class PersonnesListeComponent {
  @ViewChild(MatTable) table!: MatTable<Personne>
  personnes: Personne[] = [];
  columns = ['id', 'nom', 'prenom', 'plafond', 'depenses', 'details'];
  horsLimite: boolean = false;
  queryParamSubscription!: Subscription;

  constructor(private readonly personnesService: PersonnesService, private readonly messagesService: MessagesService, private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.queryParamSubscription = this.route.queryParamMap.subscribe(params => {
      this.horsLimite = params.get('horsLimite') === 'true';
      this.getPersonnes(0);
    });
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

  getPersonnes(sort: number) {
    this.personnes = this.personnesService.getPersonnes(sort);
    if (this.horsLimite) {
      this.personnes = this.personnes.filter(personne => this.isOverPlafond(personne));
    }
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
