import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../authservice/auth.service";

export const userGuard: CanActivateFn = (route, state) => {
  
    const authService = inject(AuthService);
    const router = inject(Router);
  
    if(authService.isLoggedIn() && authService.getUserRole() == 'ROLE_USER'){
      return true;
    }
    router.navigate(['login']);
    return false;
  }