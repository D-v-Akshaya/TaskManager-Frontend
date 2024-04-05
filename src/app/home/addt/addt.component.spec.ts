import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtComponent } from './addt.component';

describe('AddtComponent', () => {
  let component: AddtComponent;
  let fixture: ComponentFixture<AddtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddtComponent]
    });
    fixture = TestBed.createComponent(AddtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
