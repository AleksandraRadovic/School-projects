import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajProfilLekarComponent } from './azuriraj-profil-lekar.component';

describe('AzurirajProfilLekarComponent', () => {
  let component: AzurirajProfilLekarComponent;
  let fixture: ComponentFixture<AzurirajProfilLekarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajProfilLekarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzurirajProfilLekarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
