import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";

import {MatButton} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, provideNativeDateAdapter} from "@angular/material/core";
import {Depense} from '../../depense';

export type DepenseForm = {
  msg: string;
  depense: Depense;
}

export const NATURES = ['Autre', 'Alimentaire', 'Loisirs', 'Voiture', 'Habitat', 'Sport', 'Vacances'];

@Component({
  selector: 'app-depense-dialog-form',
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatInput,
    MatDatepicker,
    MatError,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton
  ],
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
  ],
  templateUrl: './depense-dialog-form.component.html',
  styleUrl: './depense-dialog-form.component.css'
})
export class DepenseDialogFormComponent implements OnInit {
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<DepenseDialogFormComponent>);
  data = inject<DepenseForm>(MAT_DIALOG_DATA);

  form = this.fb.group({
    dd: [new Date(), [Validators.required]],
    nature: ['', [Validators.required]],
    libelle: ['', [Validators.required, Validators.minLength(6)]],
    montant: [0.0, [Validators.required]],
  });

  get message(): string {
    return this.data.msg;
  }

  get natures(): string[] {
    return NATURES;
  }

  get dd() {
    return this.form.get('dd');
  }

  get libelle() {
    return this.form.get('libelle');
  }

  get montant() {
    return this.form.get('montant');
  }

  onAnnuleClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    const depense = this.data.depense;
    this.form.patchValue({
      dd: new Date(depense.dd),
      nature: depense.nature,
      libelle: depense.libelle,
      montant: +depense.montant
    })
  }

  annule() {
    return this.dialogRef.close(null);
  }

  depense() {
    this.data.depense.dd = this.form.value.dd || new Date();
    this.data.depense.nature = this.form.value.nature ?? 'Autre';
    this.data.depense.libelle = this.form.value.libelle ?? '';
    this.data.depense.montant = this.form.value.montant ?? 0.0;
    return this.dialogRef.close(this.data.depense);
  }
}
