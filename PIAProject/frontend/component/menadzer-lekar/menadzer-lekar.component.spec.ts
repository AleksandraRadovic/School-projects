import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerLekarComponent } from './menadzer-lekar.component';

describe('MenadzerLekarComponent', () => {
  let component: MenadzerLekarComponent;
  let fixture: ComponentFixture<MenadzerLekarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerLekarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerLekarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
