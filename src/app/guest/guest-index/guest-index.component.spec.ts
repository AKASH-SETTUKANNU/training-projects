import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestIndexComponent } from './guest-index.component';

describe('GuestIndexComponent', () => {
  let component: GuestIndexComponent;
  let fixture: ComponentFixture<GuestIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
