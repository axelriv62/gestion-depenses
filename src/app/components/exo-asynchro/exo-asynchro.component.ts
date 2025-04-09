import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-exo-asynchro',
  imports: [],
  templateUrl: './exo-asynchro.component.html',
  styleUrl: './exo-asynchro.component.css'
})
export class ExoAsynchroComponent implements OnInit {

  tabId: number[] = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    this.getDataItem();
  }

  // Simulaton de fonction asynchrone (question 2.1)

  async myFunction(): Promise<string> {
    return "Hello";
  }

  async callMyFunction() {
    const result = await this.myFunction();
    console.log(result);
  }


  // Simulation de récupération de données (questions 2.2 et 2.3)

  fetchData() {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.8;
      if (isSuccess) {
        console.log("Données récupérées avec succès !");
      } else {
        console.log("Échec de la récupération des données.");
      }
    }, 2000);
  }

  async getData() {
    console.log("Récupération des données...");
    const data = await this.fetchData();
    console.log(data);
    console.log("Données récupérées");
  }


  // Simulation de récupération de données avec tentatives (questions 2.4 et 2.5)

  fetchItem(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
          resolve(`Données de l'élément ${id}`);
        } else {
          reject(`Échec de la récupération des données de l'élément ${id}`);
        }
      }, 2000);
    });
  }

  async getDataItem() {
    for (const id of this.tabId) {
      console.log(`Récupération des données de l'élément ${id}`);
      let tentative = 0;
      while (tentative < 3) {
        console.log(`Tentative ${tentative + 1}`);
        try {
          const data = await this.fetchItem(id);
          console.log(data);
          break;
        } catch (error) {
          console.error(error);
          tentative++;
          if (tentative === 3) {
            console.error(`Impossible de récupérer les données de l'élément ${id} après 3 tentatives.`);
          }
        }
      }
    }
  }
}
