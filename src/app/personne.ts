/** fichier personne.ts */
import {Depense} from './depense';

export type Personne = {
  id: number;
  nom: string;
  prenom: string;
  plafond: number;
  depenses: Depense[];
}
