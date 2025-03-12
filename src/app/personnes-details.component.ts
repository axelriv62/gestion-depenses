import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PersonnesService} from './services/personnes.service';
import {DepensesService} from './services/depenses.service';

@Component({
  selector: 'app-personnes-details',
  imports: [],
  template: `
    <div>
      <p>{{ getPersonne().nom }}</p>
      <p>{{ getPersonne().prenom }}</p>
      <p>{{ getPersonne().plafond }}</p>
    </div>
    <div>
      <ul>
        @for (depense of getDepensesOfPersonneId(); track id) {
          <li>{{ depense.idPersonne }} - {{ depense.dd }} - {{ depense.nature }} - {{ depense.libelle }}
            - {{ depense.montant }}
          </li>
        }
      </ul>
    </div>
  `,
  styles: ``
})
export class PersonnesDetailsComponent {
  id: number;

  constructor(private route: ActivatedRoute, private personnesService: PersonnesService, private depensesService: DepensesService) {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);
  }

  getPersonne() {
    return this.personnesService.getPersonne(this.id);
  }

  getDepensesOfPersonneId() {
    return this.depensesService.getDepensesOfPersonneId(this.id);
  }

}
