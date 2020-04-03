import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from './main.service';

export interface SafeQuit {
  safeBack(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BeforeQuitGuard implements CanDeactivate<SafeQuit> {

  constructor(private authService: MainService, public router: Router ) {}

  canDeactivate(
    component: SafeQuit,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.safeBack() || window.confirm('Are you sure? Unsaved changes will be deleted');
  }

}
