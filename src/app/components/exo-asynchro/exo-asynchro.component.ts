import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-exo-asynchro',
  imports: [],
  templateUrl: './exo-asynchro.component.html',
  styleUrl: './exo-asynchro.component.css'
})
export class ExoAsynchroComponent implements OnInit {

  ngOnInit(): void {
    this.getData();
  }

  async myFunction(): Promise<string> {
    return "Hello";
  }

  async callMyFunction() {
    const result = await this.myFunction();
    console.log(result);
  }

  fetchData(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Data récupérées sur le serveur");
      }, 2000);
    });
  }

  async getData() {
    console.log("Récupération des données...");
    const data = await this.fetchData();
    console.log(data);
    console.log("Données récupérées");
  }
}
