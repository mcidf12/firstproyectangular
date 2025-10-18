import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseRecover } from './response-recover';

describe('ResponseRecover', () => {
  let component: ResponseRecover;
  let fixture: ComponentFixture<ResponseRecover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseRecover]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseRecover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
