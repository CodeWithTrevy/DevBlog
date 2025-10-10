import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthHomepageComponent } from './auth-homepage.component';

describe('AuthHomepageComponent', () => {
  let component: AuthHomepageComponent;
  let fixture: ComponentFixture<AuthHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthHomepageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
