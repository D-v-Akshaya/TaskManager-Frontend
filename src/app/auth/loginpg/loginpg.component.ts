import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { UserData } from '../../interfaces/user.interface';
import { EMAIL_NOT_REGISTERED, INCORRECT_PASSWORD} from 'src/app/static_strings';

@Component({
  selector: 'app-loginpg',
  templateUrl: './loginpg.component.html',
  styleUrls: ['./loginpg.component.css']
})
export class LoginpgComponent {

  result!: UserData[];
  error: string = "";
  iserror: boolean = false;

  constructor(public authService:AuthService,
     private router: Router,
     private messageService: MessageService,) {
    const userdata = localStorage.getItem('userid')
    if (userdata) {
      this.authService.isvalidate = JSON.parse(userdata).isvalidate;
      this.authService.uid = JSON.parse(userdata).uid
      this.authService.uname = JSON.parse(userdata).uname
      this.router.navigate(['home']);
    }
  }

  logform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(4)])

  })

  get email() {
    return this.logform.get('email');
  }
  get pass() {
    return this.logform.get('pass');
  }

  onSignin() {

    const enteredemail = this.logform.value.email;
    const enteredpass = this.logform.value.pass;
    this.authService.signin(enteredemail).subscribe(
      (response) => {
        this.result = response as unknown as UserData[];
        if (this.result.length>0) {
          if (this.result[0].pass== enteredpass) {
            this.iserror = false
           this.authService.isvalidate = true;
            this.authService.uid = this.result[0].uid
            this.authService.uname = this.result[0].uname
            this.router.navigate(['/home'])
            localStorage.setItem('userid', JSON.stringify(
              {
                isvalidate: true,
                uid: this.result[0].uid,
                uname: this.result[0].uname,
                email: this.result[0].email
              }))
          }
          else {
            this.iserror = true;
            this.error =INCORRECT_PASSWORD
          }
        }
        else {
          this.iserror = true;
          this.error = EMAIL_NOT_REGISTERED
        }
      });
  }

  //clearing the form
  onClear() {
    
    this.iserror = false;
    this.logform.reset();
  }

}
