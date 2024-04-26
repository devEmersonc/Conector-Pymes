import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPymesComponent } from './user-pymes.component';

describe('UserPymesComponent', () => {
  let component: UserPymesComponent;
  let fixture: ComponentFixture<UserPymesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPymesComponent]
    });
    fixture = TestBed.createComponent(UserPymesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
