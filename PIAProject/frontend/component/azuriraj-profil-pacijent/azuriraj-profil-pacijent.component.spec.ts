import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajProfilPacijentComponent } from './azuriraj-profil-pacijent.component';

describe('AzurirajProfilPacijentComponent', () => {
  let component: AzurirajProfilPacijentComponent;
  let fixture: ComponentFixture<AzurirajProfilPacijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajProfilPacijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzurirajProfilPacijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
