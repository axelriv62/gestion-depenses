import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-exo-asynchro',
  imports: [],
  templateUrl: './exo-asynchro.component.html',
  styleUrl: './exo-asynchro.component.css'
})
export class ExoAsynchroComponent implements OnInit {

  ngOnInit(): void {
    this.callMyFunction();
  }

  async myFunction(): Promise<string> {
    return "Hello";
  }

  async callMyFunction() {
    const result = await this.myFunction();
    console.log(result);
  }

}
