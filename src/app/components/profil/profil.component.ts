import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Personne} from '../../personne';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  auth = inject(AuthService);
  personne: Personne = <Personne>{};

  constructor() {
    this.getMe();
  }

  async getMe() {
    const pers = await this.auth.me();
    this.personne.nom = pers.nom;
    this.personne.prenom = pers.prenom;
    this.personne.plafond = Number(pers.plafond);
  }
}
