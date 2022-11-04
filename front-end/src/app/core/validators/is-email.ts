import { ValidatorFn, AbstractControl } from '@angular/forms';

const emailCustomValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailRe = new RegExp (
     [
    '^(([^<>()[\\]\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\.,;:\\s@\"]+)*)',
    '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
    '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+',
    '[a-zA-Z]{2,}))$'
    ].join(''));
    const isEmail = emailRe.test(control.value);
    return isEmail ? null : { notValidEmail: control.value };
  };
};

export default emailCustomValidator;
