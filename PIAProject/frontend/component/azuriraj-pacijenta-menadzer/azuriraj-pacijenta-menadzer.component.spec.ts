import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajPacijentaMenadzerComponent } from './azuriraj-pacijenta-menadzer.component';

describe('AzurirajPacijentaMenadzerComponent', () => {
  let component: AzurirajPacijentaMenadzerComponent;
  let fixture: ComponentFixture<AzurirajPacijentaMenadzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajPacijentaMenadzerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzurirajPacijentaMenadzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
