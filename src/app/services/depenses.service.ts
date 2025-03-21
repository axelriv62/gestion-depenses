import {Injectable} from '@angular/core';
import {Depense} from '../depense';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

export type GetDepensesResponse = {
  data: {
    depenses: Depense[];
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

  constructor(private http: HttpClient) {
  }

  async getDepensesOfPersonneId(id: number, sort: number): Promise<Depense[]> {
    console.log("appel de getDepensesOfPersonneId dans le service depenses pour la personne " + id);
    const depenses$ = this.http.get<GetDepensesResponse>(`${this.url}/depenses/personne/${id}`, this.httpOptions);
    const response = await firstValueFrom(depenses$);

    if (sort === 0) {
      return response.data.depenses.sort((a, b) => new Date(a.dd).getTime() - new Date(b.dd).getTime());
    } else if (sort === 1) {
      return response.data.depenses.sort((a, b) => b.montant - a.montant);
    } else if (sort === 2) {
      return response.data.depenses.sort((a, b) => a.nature.localeCompare(b.nature) || b.montant - a.montant);
    } else {
      return response.data.depenses;
    }
  }

  async filtreDepenses(id: number, nature: string): Promise<Depense[]> {
    if (nature !== '') {
      return (await this.getDepensesOfPersonneId(id, 0)).filter(depense => depense.nature === nature);
    } else {
      return this.getDepensesOfPersonneId(id, 0);
    }
  }
}
