import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.jeUlogovan=localStorage.getItem('jeUlogovan')
    this.jeRegistracija=localStorage.getItem('jeRegistracija')
    this.jePrijava=localStorage.getItem('jePrijava')
    this.tipKorisnika=localStorage.getItem('tipKorisnika')
    this.menadzerPrijava=localStorage.getItem('menadzerPrijava');
  }
  jeUlogovan:string;
  jeRegistracija:string;
  jePrijava:string;
  tipKorisnika:string;
  menadzerPrijava:string
  odjava(){
    localStorage.setItem('jeUlogovan', 'ne')
    this.router.navigate(['']);
  }
}
