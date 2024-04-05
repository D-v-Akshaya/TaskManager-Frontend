import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {  AuthGuardCanActivate, AuthGuardCanDeactivate } from "../services/auth-guard.service";
import { HomeComponent } from "./home.component";
import { SummaryComponent } from "./summary/summary.component";
import { ViewComponent } from "./view/view.component";
import { AddtComponent } from "./addt/addt.component";
import { PagenotfoundComponent } from "../pagenotfound/pagenotfound.component";

const routes: Routes = [{
  path: "", component: HomeComponent, canActivate: [AuthGuardCanActivate],
  children: [
     { path: "summary", component: SummaryComponent },
    { path: "view", component: ViewComponent },
    { path: "add", component: AddtComponent,canDeactivate:[AuthGuardCanDeactivate] },
    { path: "", redirectTo:"summary",pathMatch:'full'},
    { path: '**', component:PagenotfoundComponent}
  ]
},
// { path: '**', pathMatch: 'prefix', component: PagenotfoundComponent },
];



@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeRoutingModule { }