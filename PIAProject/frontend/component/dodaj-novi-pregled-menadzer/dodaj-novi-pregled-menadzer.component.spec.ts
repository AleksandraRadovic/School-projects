import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajNoviPregledMenadzerComponent } from './dodaj-novi-pregled-menadzer.component';

describe('DodajNoviPregledMenadzerComponent', () => {
  let component: DodajNoviPregledMenadzerComponent;
  let fixture: ComponentFixture<DodajNoviPregledMenadzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajNoviPregledMenadzerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajNoviPregledMenadzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
