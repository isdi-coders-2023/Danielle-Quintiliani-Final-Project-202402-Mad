import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import { PaymentService } from '../../core/payment/payment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Stripe, StripeCardElement, StripeError } from '@stripe/stripe-js';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  const mockPaymentService = jasmine.createSpyObj('PaymentService', {
    createPaymentIntent: of({
      error: 'test error',
      clientSecret: 'test_secret',
    }),
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentComponent, HttpClientTestingModule],
      providers: [{ provide: PaymentService, usevalue: mockPaymentService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call initializeStripe in ngAfterViewChecked if showCheckoutForm is true and card is not initialized', () => {
    spyOn(component, 'initializeStripe');
    component.showCheckoutForm = true;
    component.card = null;
    component.ngAfterViewChecked();
    expect(component.initializeStripe).toHaveBeenCalled();
  });
  it('should not call initializeStripe in ngAfterViewChecked if showCheckoutForm is false', () => {
    spyOn(component, 'initializeStripe');
    component.showCheckoutForm = false;
    component.ngAfterViewChecked();
    expect(component.initializeStripe).not.toHaveBeenCalled();
  });
  it('should initialize elements and card in initializeStripe', async () => {
    component.stripe = {
      elements: jasmine.createSpy('elements').and.returnValue({
        create: () => ({ mount: jasmine.createSpy('mount') }),
      }),
    } as never;
    await component.initializeStripe();
    expect(component.elements).toBeTruthy();
    expect(component.card).toBeTruthy();
    expect(component.card!.mount).toHaveBeenCalledWith('#card-element');
  });
  it('should close the modal in closeModal', () => {
    component.showModal = true;
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });
  it('should handle payment success in handlePayment', async () => {
    const mockConfirmCardPayment = jasmine
      .createSpy('confirmCardPayment')
      .and.returnValue(
        Promise.resolve({ paymentIntent: { status: 'succeeded' } }),
      );
    component.stripe = {
      confirmCardPayment: mockConfirmCardPayment,
    } as unknown as Stripe;
    component.card = {} as StripeCardElement;
    mockPaymentService.createPaymentIntent.and.returnValue(
      of({ clientSecret: 'test_secret' }),
    );
    spyOn(component.paymentService, 'createPaymentIntent').and.returnValue(
      of({ clientSecret: 'test_secret' }),
    );
    await component.handlePayment('50');
    expect(component.paymentService.createPaymentIntent).toHaveBeenCalled();
    expect(mockConfirmCardPayment).toHaveBeenCalledWith('test_secret', {
      payment_method: { card: component.card },
    });
    expect(component.showModal).toBeTrue();
  });
  it('should handle payment failure in handlePayment', async () => {
    const mockConfirmCardPayment = jasmine
      .createSpy('confirmCardPayment')
      .and.rejectWith(Promise.reject({ paymentIntent: { status: 'failed' } }));
    component.stripe = {
      confirmCardPayment: mockConfirmCardPayment,
    } as unknown as Stripe;
    component.card = {} as StripeCardElement;
    mockPaymentService.createPaymentIntent.and.returnValue(
      of({ clientSecret: 'test_secret' }),
    );
    spyOn(component.paymentService, 'createPaymentIntent').and.returnValue(
      of({ clientSecret: 'test_secret' }),
    );
    await component.handlePayment('50');
    expect(component.paymentService.createPaymentIntent).toHaveBeenCalled();
    expect(mockConfirmCardPayment).toHaveBeenCalledWith('test_secret', {
      payment_method: { card: component.card },
    });
    expect(component.showModal).toBeFalse();
  });
  it('should return early if stripe or card are not defined', async () => {
    component.stripe = null;
    component.card = null;
    spyOn(component.paymentService, 'createPaymentIntent');
    await component.handlePayment('50');
    expect(component.paymentService.createPaymentIntent).not.toHaveBeenCalled();
  });
  it('should log error if stripe.confirmCardPayment fails', async () => {
    const error = 'card_error' as unknown as StripeError;
    const mockConfirmCardPayment = jasmine
      .createSpy('confirmCardPayment')
      .and.returnValue(Promise.resolve(error));
    component.stripe = {
      confirmCardPayment: mockConfirmCardPayment,
    } as unknown as Stripe;
    component.card = {} as StripeCardElement;

    spyOn(console, 'error');
    console.error(error);
    await component.handlePayment('50');
    expect(console.error).toHaveBeenCalledWith(error);
    expect(component.showModal).toBeFalse();
  });
});
