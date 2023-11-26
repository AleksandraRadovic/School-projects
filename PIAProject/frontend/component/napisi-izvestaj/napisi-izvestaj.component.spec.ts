import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NapisiIzvestajComponent } from './napisi-izvestaj.component';

describe('NapisiIzvestajComponent', () => {
  let component: NapisiIzvestajComponent;
  let fixture: ComponentFixture<NapisiIzvestajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NapisiIzvestajComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NapisiIzvestajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
