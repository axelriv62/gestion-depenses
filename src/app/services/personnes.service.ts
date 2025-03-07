import {Injectable} from '@angular/core';
import {Personne} from '../personne';
import {Datas} from '../mock-datas';

@Injectable({
  providedIn: 'root'
})
export class PersonnesService {
  personnes: Personne[];

  constructor() {
    const datas = Datas.getInstance();
    this.personnes = datas.generePersonnes();
  }

  getPersonnes(sort: number): Personne[] {
    if (sort === 0) {
      return this.personnes.sort((a, b) => a.id - b.id);
    } else if (sort === 1) {
      return this.personnes.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (sort === 2) {
      return this.personnes.sort((a, b) => b.nom.localeCompare(a.nom));
    } else {
      return this.personnes;
    }
  }

  totalDepenses(personne: Personne): number {
    return personne.depenses.reduce((somme, depense) => somme + depense.montant, 0);
  }
}
