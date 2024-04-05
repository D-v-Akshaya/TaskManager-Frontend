
import {  ActivatedRouteSnapshot,CanActivateFn,  CanDeactivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';


export interface ComfirmationDeactivate{
  CanDeactivate:()=>Observable<boolean>|Promise<boolean>|boolean
}

export const AuthGuardCanActivate: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const service = inject(AuthService)

  if (service.isvalidate) {
    return true;
  } else {
    router.navigate(['/auth']); // Redirect to signin if not authenticated
    return false;
  }
};
export const AuthGuardCanDeactivate: CanDeactivateFn<ComfirmationDeactivate> = (component:ComfirmationDeactivate,
      currentRoute:ActivatedRouteSnapshot,
       currentState:RouterStateSnapshot,
      nextState:RouterStateSnapshot) => {

        return component.CanDeactivate();
};
