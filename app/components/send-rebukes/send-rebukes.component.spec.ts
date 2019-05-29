import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRebukesComponent } from './send-rebukes.component';

describe('SendRebukesComponent', () => {
  let component: SendRebukesComponent;
  let fixture: ComponentFixture<SendRebukesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendRebukesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRebukesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
