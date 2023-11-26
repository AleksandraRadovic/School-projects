import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecijalizacijePreglediComponent } from './specijalizacije-pregledi.component';

describe('SpecijalizacijePreglediComponent', () => {
  let component: SpecijalizacijePreglediComponent;
  let fixture: ComponentFixture<SpecijalizacijePreglediComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecijalizacijePreglediComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecijalizacijePreglediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
