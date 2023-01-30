import { FormGroup,FormBuilder,FormControl, Validator, Validators,ValidationErrors } from '@angular/forms';

export class ShopValidators {

static notOnlyWhiteSpace(control: FormControl): ValidationErrors{
if(control.value!=null && control.value.trim().length===0){
return { 'notOnlyWhiteSpace': true };
}else{
return null;
}
}
}
