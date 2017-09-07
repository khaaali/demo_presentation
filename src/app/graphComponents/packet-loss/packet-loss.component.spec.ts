/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PacketLossComponent } from './packet-loss.component';

describe('PacketLossComponent', () => {
  let component: PacketLossComponent;
  let fixture: ComponentFixture<PacketLossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketLossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
