import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificado } from './email-verificado';

describe('EmailVerificado', () => {
  let component: EmailVerificado;
  let fixture: ComponentFixture<EmailVerificado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailVerificado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailVerificado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
