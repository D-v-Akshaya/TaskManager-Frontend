import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginpgComponent } from './loginpg/loginpg.component';
import { RegisterpgComponent } from './registerpg/registerpg.component';
import { AuthRoutingModule } from './auth-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    AuthComponent,
    LoginpgComponent,
    RegisterpgComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessagesModule,
  ],

})
export class AuthModule { }
