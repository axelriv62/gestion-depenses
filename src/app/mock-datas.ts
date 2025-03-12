import {fakerFR as faker} from '@faker-js/faker';
import {Personne} from './personne';

export class Datas {
  private static instance: Datas;

  private constructor() {
  }

  public static getInstance(): Datas {
    if (Datas.instance === undefined) {
      Datas.instance = new Datas();
    }
    return Datas.instance;
  }

  public generePersonnes(nb?: number): Personne[] {
    let idP: number = 1;
    let idD: number = 1;
    const personnes = [];

    if (!nb)
      nb = 10;
    for (let i = 0; i < nb; i++) {
      let idPersonne = idP++;
      const nbDepenses = faker.number.int({min: 10, max: 20});
      const tabDep = [];
      for (let j = 0; j < nbDepenses; j++) {
        const dep = {
          nature: faker.helpers.arrayElement(['Alimentaire', 'Loisirs', 'Voiture', 'Habitat', 'Sport', 'Vacances']),
          dd: faker.date.between({from: '2019-01-01', to: '2019-12-31'}),
          libelle: faker.hacker.phrase(),
          montant: +faker.finance.amount({min: 100, max: 750, dec: 2}),
          id: idD++,
          idPersonne: idPersonne,
        };
        tabDep.push(dep);
      }
      const personne = {
        id: idPersonne,
        nom: faker.person.lastName(),
        prenom: faker.person.firstName(),
        plafond: +faker.finance.amount({min: 5000, max: 10000, dec: 2}),
        depenses: tabDep
      };
      personnes.push(personne);
    }
    return personnes;
  }
}
