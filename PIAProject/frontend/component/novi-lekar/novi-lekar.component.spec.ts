import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviLekarComponent } from './novi-lekar.component';

describe('NoviLekarComponent', () => {
  let component: NoviLekarComponent;
  let fixture: ComponentFixture<NoviLekarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoviLekarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoviLekarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
