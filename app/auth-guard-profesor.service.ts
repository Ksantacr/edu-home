import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import { BackendService } from "./services/backend.service";

@Injectable()
export class AuthGuardProfesor implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (BackendService.isLoggedIn() && BackendService.isProfesor()) {
      return true;
    }
    else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}