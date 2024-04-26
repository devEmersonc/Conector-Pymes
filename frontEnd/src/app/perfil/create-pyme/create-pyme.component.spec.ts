import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePymeComponent } from './create-pyme.component';

describe('CreatePymeComponent', () => {
  let component: CreatePymeComponent;
  let fixture: ComponentFixture<CreatePymeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePymeComponent]
    });
    fixture = TestBed.createComponent(CreatePymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
