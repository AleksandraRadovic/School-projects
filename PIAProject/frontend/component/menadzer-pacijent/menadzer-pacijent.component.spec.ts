import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerPacijentComponent } from './menadzer-pacijent.component';

describe('MenadzerPacijentComponent', () => {
  let component: MenadzerPacijentComponent;
  let fixture: ComponentFixture<MenadzerPacijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerPacijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerPacijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
