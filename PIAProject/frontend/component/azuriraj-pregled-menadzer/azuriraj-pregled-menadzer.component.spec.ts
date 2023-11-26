import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajPregledMenadzerComponent } from './azuriraj-pregled-menadzer.component';

describe('AzurirajPregledMenadzerComponent', () => {
  let component: AzurirajPregledMenadzerComponent;
  let fixture: ComponentFixture<AzurirajPregledMenadzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajPregledMenadzerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzurirajPregledMenadzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
