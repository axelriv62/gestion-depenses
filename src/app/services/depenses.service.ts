import {Injectable} from '@angular/core';
import {Depense} from '../depense';
import {PersonnesService} from './personnes.service';

@Injectable({
  providedIn: 'root'
})
export class DepensesService {
  depenses: Depense[] = [];

  constructor(private personnesService: PersonnesService) {
    this.personnesService.getPersonnes(0).forEach(p => this.depenses.push(...p.depenses));
  }

  getDepensesOfPersonneId(id: number, sort?: number): Depense[] {
    let depenses = this.depenses.filter(depense => depense.idPersonne === id);
    if (sort === 0) {
      return depenses.sort((a, b) => a.dd.getTime() - b.dd.getTime());
    } else if (sort === 1) {
      return depenses.sort((a, b) => b.montant - a.montant);
    } else if (sort === 2) {
      return depenses.sort((a, b) => a.nature.localeCompare(b.nature) || b.montant - a.montant);
    } else {
      return depenses;
    }
  }
}
