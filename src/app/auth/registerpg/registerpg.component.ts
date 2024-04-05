import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,FormGroupDirective,NgForm, ValidatorFn } from '@angular/forms';

import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService,Message } from 'primeng/api';

@Component({
  selector: 'app-registerpg',
  templateUrl: './registerpg.component.html',
  styleUrls: ['./registerpg.component.css']
})
export class RegisterpgComponent {
  result!: string;
  success: boolean = true;

  constructor(public authService: AuthService,private messageService: MessageService,) { }

  // Custom validator function for password matching
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group?.get('pass')?.value;
    let confirmPass = group?.get('conpass')?.value
    return pass === confirmPass ? null : { notSame: true }
  }
  regform = new FormGroup(
    {
      uname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(4)]),
      conpass: new FormControl('', [ Validators.required ])
    }, { validators: this.checkPasswords }
  );

  get uname() {
    return this.regform.get('uname');
  }
  get email() {
    return this.regform.get('email');
  }
  get pass() {
    return this.regform.get('pass');
  }
  get conpass() {
      return this.regform.get('conpass');
    }
  
  onsubmit() {
   

    this.authService.signup(this.regform.value).subscribe(
      (response) =>{ this.result = response
     this.sucessmessage(response)
      this.regform.reset();
    },
      (error) => this.result = error
    );
  }

  onclear() {
    this.regform.reset();
  }


  sucessmessage(message:string) {
    this.messageService.add({ severity: 'info', detail:message})
    setTimeout(() => {
      this.clearMessages();
    }, 3000);
  }
  
  clearMessages() {
    this.messageService.clear();
  }

}
