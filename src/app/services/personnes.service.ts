import {Injectable} from '@angular/core';
import {Personne} from '../personne';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessagesService} from './messages.service';
import {firstValueFrom} from 'rxjs';
import {DepensesService} from './depenses.service';

export type GetPersonnesResponse = {
  data: {
    personnes: Personne[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class PersonnesService {
  readonly url = 'http://localhost:8000/api';
  readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private messageService: MessagesService, private depensesService: DepensesService) {
  }

  // comme dans le sujet
  async getPersonnes(sort: number): Promise<Personne[]> {
    console.log("appel de getPersonnes dans le service personnes");
    const personnes$ = this.http.get<GetPersonnesResponse>(`${this.url}/personnes`, this.httpOptions);
    const response = await firstValueFrom(personnes$);

    if (sort === 0) {
      return response.data.personnes.sort((a, b) => a.id - b.id);
    } else if (sort === 1) {
      return response.data.personnes.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (sort === 2) {
      return response.data.personnes.sort((a, b) => b.nom.localeCompare(a.nom));
    } else {
      return response.data.personnes;
    }
  }

  async totalDepenses(personne: Personne): Promise<number> {
    console.log("appel de totalDepenses dans le service personnes pour la personne " + personne.id);
    const depenses = await this.depensesService.getDepensesOfPersonneId(personne.id, 0);
    return depenses.reduce((acc, depense) => acc + depense.montant, 0);
  }

  async getPersonne(id: number): Promise<Personne> {
    console.log("appel de getPersonne dans le service personnes pour la personne " + id);
    const personne$ = this.http.get<Personne>(`${this.url}/personnes/${id}`, this.httpOptions);
    return await firstValueFrom(personne$);
  }
}
