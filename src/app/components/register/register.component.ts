import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatError,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  form: FormGroup = this.fb.group({
    email: new FormControl("robert.duchmol@domain.fr", [Validators.required, Validators.email]),
    password: new FormControl("GrosSecret", [Validators.required]),
    nom: new FormControl("Duchmol", [Validators.required]),
    prenom: new FormControl("Robert", [Validators.required]),
    plafond: new FormControl(9999999999, [Validators.required]),
  });

  constructor() {
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get nom() {
    return this.form.get('nom');
  }

  get prenom() {
    return this.form.get('prenom');
  }

  get plafond() {
    return this.form.get('plafond');
  }

  async register() {
    const credentials = {...this.form.value};
    console.log(credentials);
    try {
      await this.authService.register(credentials);
      await this.router.navigate(['/']);
      this.snackBar.open(`Bienvenue, ${this.authService.user().name}`, 'Close', {
        duration: 2000, horizontalPosition: 'left', verticalPosition: 'top'
      })
    } catch (error) {
      console.error(`Error while registering in`, error);
      this.snackBar.open('Connexion invalide', 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })
    }

  }
}
