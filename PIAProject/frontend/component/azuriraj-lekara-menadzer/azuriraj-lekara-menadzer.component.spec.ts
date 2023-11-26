import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajLekaraMenadzerComponent } from './azuriraj-lekara-menadzer.component';

describe('AzurirajLekaraMenadzerComponent', () => {
  let component: AzurirajLekaraMenadzerComponent;
  let fixture: ComponentFixture<AzurirajLekaraMenadzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajLekaraMenadzerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzurirajLekaraMenadzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
