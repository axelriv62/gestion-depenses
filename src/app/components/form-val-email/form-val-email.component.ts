import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-form-val-email',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput
  ],
  templateUrl: './form-val-email.component.html',
  styleUrl: './form-val-email.component.css'
})


export class FormValEmailComponent {
  fb = inject(FormBuilder);

  formulaire = this.fb.group({
    email: new FormControl('',
      [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]),
  });

  get email(): AbstractControl | null {
    return this.formulaire.get('email');
  }
}

