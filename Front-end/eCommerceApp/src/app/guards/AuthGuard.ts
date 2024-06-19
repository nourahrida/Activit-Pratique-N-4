import { AppStateService } from "../services/app-state.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private appState: AppStateService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authState = this.appState.authState;
    const requiredRoles = route.data['requiredRoles'] as Array<string>;
    const role = authState.role;
    if (authState && role) {
      if (requiredRoles.includes(role.toString())) {
        return true;
      } else {
        this.router.navigateByUrl("/notAuthorized").then(r => {
          console.log("To NotAuthorized");
        });
        return false;
      }
    } else {
      this.router.navigateByUrl("/login").then(r => {
        console.log("To Login");
      });
      return false;
    }
  }
}
