import { ValidatorFn, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (control: FormGroup): 
  ValidationErrors | null => {
    const password = control.get('password');
    const confirm = control.get('confirmPass');
    return password && confirm && password.value !== confirm.value ? { 'nonMatching': true} : null;
  }