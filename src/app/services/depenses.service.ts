import {Injectable} from '@angular/core';
import {Depense} from '../depense';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

export type GetDepensesResponse = {
  data: {
    depenses: Depense[];
  }
}

export type DepenseResponse = {
  data: {
    depense: Depense;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DepensesService {
  readonly url = 'http://localhost:8000/api';
  readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private readonly http: HttpClient) {
  }

  async getDepensesOfPersonneId(id: number, sort: number): Promise<Depense[]> {
    const depenses$ = this.http.get<GetDepensesResponse>(`${this.url}/depenses/personne/${id}`, this.httpOptions);
    const response = await firstValueFrom(depenses$);

    if (sort === 0) {
      return response.data.depenses.sort((a, b) => new Date(a.dd).getTime() - new Date(b.dd).getTime());
    } else if (sort === 1) {
      return response.data.depenses.sort((a, b) => b.montant - a.montant);
    } else if (sort === 2) {
      return response.data.depenses.sort((a, b) => a.nature.localeCompare(b.nature) || b.montant - a.montant);
    }
    return response.data.depenses;
  }

  async filtreDepenses(id: number, nature: string): Promise<Depense[]> {
    if (nature !== '') {
      return (await this.getDepensesOfPersonneId(id, 0)).filter(depense => depense.nature === nature);
    }
    return this.getDepensesOfPersonneId(id, 0);
  }

  async updateDepense(depense: Depense): Promise<Depense> {
    console.log("dépense :")
    const depenseToUpdate = {
      personne_id: depense.personneId.toString(),
      libelle: depense.libelle,
      montant: depense.montant,
      dd: depense.dd.toISOString(),
      nature: depense.nature,
    };
    return firstValueFrom(this.http.put<Depense>(`${this.url}/depenses/${depense.id}`, depenseToUpdate, this.httpOptions));
  }

  async getDepense(id: number) {
    return firstValueFrom(this.http.get<DepenseResponse>(`${this.url}/depenses/${id}`, this.httpOptions));
  }
}
