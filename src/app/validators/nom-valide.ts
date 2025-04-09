import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function nomValide(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const valid = /^[a-zA-Z]+$/.test(value);
    return !valid ? {nomInvalid: true} : null;
  };
}
