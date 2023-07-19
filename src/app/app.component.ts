import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signUpForm : FormGroup
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signUpForm = new FormGroup ({
      'userData' : new FormGroup({
        'userName': new FormControl(null,  [
          this.ForbiddenNames.bind(this),
          Validators.required,
        ]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    })
  }

  onSubmit(){
    console.log(this.signUpForm)
  }

  ForbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  onAddHobby(){
    const control = new FormControl(null,Validators.required);
   (<FormArray> this.signUpForm.get('hobbies')).push(control) //it is imoirtant to typecast a form arry to use array functions on top of it
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }
}
