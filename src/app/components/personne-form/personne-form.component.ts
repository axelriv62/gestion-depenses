import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {JsonPipe} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {nomValide} from '../../validators/nom-valide';

interface Specialite {
  valeur: string;
  libelle: string;
}

@Component({
  selector: 'app-intro-formulaire',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    JsonPipe,
    MatInput,
    MatButton,
    MatExpansionModule,
    MatError
  ],
  templateUrl: './personne-form.component.html',
  styleUrl: './personne-form.component.css'
})
export class PersonneFormComponent {
  formulaire = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(3), nomValide()]),
    prenom: new FormControl(''),
    numeroTelCtrl: new FormControl(''),
    specialite: new FormControl('')
  });

  specialites: Specialite[] = [
    {valeur: 'polyvalent', libelle: 'Polyvalent'}, {valeur: 'charpentier', libelle: 'Charpentier'},
    {valeur: 'chauffagiste', libelle: 'Chauffagiste'}, {valeur: 'couvreur', libelle: 'Couvreur'},
    {valeur: 'electricien', libelle: 'Electricien'}, {valeur: 'grutier', libelle: 'Grutier'},
    {valeur: 'Macon', libelle: 'Maçon'}, {valeur: 'plaquiste', libelle: 'Plaquiste'},
    {valeur: 'plombier', libelle: 'Plombier'}
  ];

  constructor() {
  }

  get numeroTelCtrl(): AbstractControl | null {
    return this.formulaire.get('numeroTelCtrl');
  }

  get nom() {
    return this.formulaire.get('nom');
  }

  onSubmit() {
    console.info(this.formulaire.value);
  }
}
