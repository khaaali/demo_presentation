/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InclinationComponent } from './inclination.component';

describe('InclinationComponent', () => {
  let component: InclinationComponent;
  let fixture: ComponentFixture<InclinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InclinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InclinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
