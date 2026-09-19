import { TestBed } from '@angular/core/testing';
import { WelcomePage } from './welcome-page';

describe('WelcomePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomePage],
    }).compileComponents();
  });

  it('renders the Angular FSD starter experience', () => {
    const fixture = TestBed.createComponent(WelcomePage);
    fixture.detectChanges();

    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('Angular architecture');
    expect(page.textContent).toContain('Complete FSD layers');
    expect(page.textContent).toContain('src/features/');
  });

  it('uses signal state to toggle the details section', () => {
    const fixture = TestBed.createComponent(WelcomePage);
    fixture.detectChanges();

    const page = fixture.nativeElement as HTMLElement;
    const toggle = page.querySelector('button');
    toggle?.click();
    fixture.detectChanges();

    expect(page.textContent).not.toContain('Complete FSD layers');
    expect(toggle?.textContent).toContain('Show details');
  });
});
