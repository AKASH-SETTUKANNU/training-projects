import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGuestManagementComponent } from './guest-guest-management.component';

describe('GuestGuestManagementComponent', () => {
  let component: GuestGuestManagementComponent;
  let fixture: ComponentFixture<GuestGuestManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestGuestManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestGuestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
