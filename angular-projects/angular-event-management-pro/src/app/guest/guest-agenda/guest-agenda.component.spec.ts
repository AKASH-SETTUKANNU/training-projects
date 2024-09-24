import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestAgendaComponent } from './guest-agenda.component';

describe('GuestAgendaComponent', () => {
  let component: GuestAgendaComponent;
  let fixture: ComponentFixture<GuestAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
