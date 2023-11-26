import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviPregledZahtevComponent } from './novi-pregled-zahtev.component';

describe('NoviPregledZahtevComponent', () => {
  let component: NoviPregledZahtevComponent;
  let fixture: ComponentFixture<NoviPregledZahtevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoviPregledZahtevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoviPregledZahtevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
