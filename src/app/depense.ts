/** fichier depense.ts */
export type Depense = {
  id: number;
  personneId: number;
  dd: Date;
  nature: string;
  libelle: string;
  montant: number;
}
