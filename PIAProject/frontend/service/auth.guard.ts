import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KorisnikService } from './korisnik.service';
import { Korisnik } from './models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private korisnikService:KorisnikService){}
  canActivate(
    route: ActivatedRouteSnapshot):boolean{
      if(route.data['requiredRole'] == '-5' && localStorage.getItem('jeUlogovan')=='ne'){
        return true
      }
      if (localStorage.getItem('jeUlogovan')=='da') {
        let korisnik = JSON.parse(localStorage.getItem('korisnik')) as Korisnik;
  
        
        console.log('User Type:', korisnik.tip.toString());
        console.log('required role:', route.data['requiredRole'])
        
        if(route.data['requiredRole'].includes(korisnik.tip.toString())){
          return true;
        }else{
          if(korisnik.tip=='pacijent'){
            this.router.navigate(['pacijent']);
          }else if(korisnik.tip == 'lekar'){
            this.router.navigate(['lekar']);
          }else if(korisnik.tip == 'menadzer'){
            this.router.navigate(['menadzer']);
          }  
          return false;
        }  
      } else {
        this.router.navigate(['']);  // User is not logged in, redirect to the login page
        return false; 
      }
  }
  
}
