import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimPage } from './claim.page';

describe('ClaimPage', () => {
  let component: ClaimPage;
  let fixture: ComponentFixture<ClaimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
