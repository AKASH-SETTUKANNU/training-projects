import { TestBed } from '@angular/core/testing';
import { AppComponentna } from './app.component';

describe('AppComponentna', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponentna],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponentna);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-pro' title`, () => {
    const fixture = TestBed.createComponent(AppComponentna);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-pro');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponentna);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-pro');
  });
});
