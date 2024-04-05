import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { NgModule } from "@angular/core";
import { RegisterpgComponent } from "./registerpg/registerpg.component";
import { LoginpgComponent } from "./loginpg/loginpg.component";
import { PagenotfoundComponent } from "../pagenotfound/pagenotfound.component";

const routes: Routes = [
    {path: "", component: AuthComponent,children:[
        { path: '', redirectTo: 'signin', pathMatch: 'full' },
        { path:"signup", component:RegisterpgComponent },
        { path: "signin", component: LoginpgComponent },
        { path: '**', component:PagenotfoundComponent}
    ]},
  ];
  
  
  @NgModule({
      declarations: [],
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
    export class AuthRoutingModule { }