import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarIzborPregledaComponent } from './lekar-izbor-pregleda.component';

describe('LekarIzborPregledaComponent', () => {
  let component: LekarIzborPregledaComponent;
  let fixture: ComponentFixture<LekarIzborPregledaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarIzborPregledaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarIzborPregledaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
