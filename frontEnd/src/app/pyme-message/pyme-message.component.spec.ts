import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PymeMessageComponent } from './pyme-message.component';

describe('PymeMessageComponent', () => {
  let component: PymeMessageComponent;
  let fixture: ComponentFixture<PymeMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PymeMessageComponent]
    });
    fixture = TestBed.createComponent(PymeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
