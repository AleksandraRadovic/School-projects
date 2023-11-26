import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilLekaraPacijentComponent } from './profil-lekara-pacijent.component';

describe('ProfilLekaraPacijentComponent', () => {
  let component: ProfilLekaraPacijentComponent;
  let fixture: ComponentFixture<ProfilLekaraPacijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilLekaraPacijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilLekaraPacijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
