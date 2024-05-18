import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreatePaymentIntentResponse {
  clientSecret: string;
}
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  http = inject(HttpClient);

  createPaymentIntent(amount: number): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(
      `https://danielle-quintiliani-final-project.onrender.com/payment/create-payment-intent`,
      { amount },
    );
  }
}
