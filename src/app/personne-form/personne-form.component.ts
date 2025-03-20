import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

interface Specialite {
  valeur: string;
  libelle: string;
}

@Component({
  selector: 'app-intro-formulaire',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './personne-form.component.html',
  styleUrl: './personne-form.component.css'
})
export class PersonneFormComponent {
  formulaire = new FormGroup({
    nom: new FormControl(''),
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
}
