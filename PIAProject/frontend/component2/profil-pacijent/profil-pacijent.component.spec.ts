import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPacijentComponent } from './profil-pacijent.component';

describe('ProfilPacijentComponent', () => {
  let component: ProfilPacijentComponent;
  let fixture: ComponentFixture<ProfilPacijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilPacijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilPacijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
