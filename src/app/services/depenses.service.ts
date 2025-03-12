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

  getDepensesOfPersonneId(id: number): Depense[] {
    return this.depenses.filter(depense => depense.idPersonne === id);
  }
}
