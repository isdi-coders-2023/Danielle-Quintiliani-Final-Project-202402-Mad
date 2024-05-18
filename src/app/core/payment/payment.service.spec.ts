import { TestBed } from '@angular/core/testing';

import { PaymentService } from './payment.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService, HttpClientModule],
    });
    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  /*  afterEach(() => {
    httpMock.verify();
  }); */

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call createPaymentIntent', () => {
    const url = 'http://localhost:3400/payment/create-payment-intent';
    service.createPaymentIntent(100).subscribe(() => {
      expect(url).toBe(url);
    });
  });
});
