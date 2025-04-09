import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Identite} from '../../auth-interfaces';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  form: FormGroup = this.fb.group({
    email: new FormControl("robert.duchmol@domain.fr", [Validators.required, Validators.email]),
    password: new FormControl("GrosSecret", [Validators.required]),
  });

  constructor() {
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  async login() {
    const credentials: Identite = {...this.form.value};
    try {
      await this.authService.login(credentials);
      await this.router.navigate(['/']);
      this.snackBar.open(`Bienvenue, ${this.authService.user().name}`, 'Close', {
        duration: 2000, horizontalPosition: 'left', verticalPosition: 'top'
      })
    } catch (error) {
      console.error(`Error while logging in`, error);
      this.snackBar.open('Connexion invalide', 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })
    }

  }
}
