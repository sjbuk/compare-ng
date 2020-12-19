import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCompareComponent } from './form-compare.component';

describe('FormCompareComponent', () => {
  let component: FormCompareComponent;
  let fixture: ComponentFixture<FormCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
