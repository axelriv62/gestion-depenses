// Code récupéré sur le sujet

import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-intro-formulaire',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput
  ],
  templateUrl: './intro-formulaire.component.html',
  styleUrl: './intro-formulaire.component.css'
})
export class IntroFormulaireComponent {
  formulaire = new FormGroup({
    numeroTelCtrl: new FormControl('')
  });

  constructor() {
  }

  get numeroTelCtrl(): AbstractControl | null {
    return this.formulaire.get('numeroTelCtrl');
  }
}
