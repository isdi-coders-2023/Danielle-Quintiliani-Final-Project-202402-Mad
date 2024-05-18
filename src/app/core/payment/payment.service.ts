import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreatePaymentIntentResponse {
  clientSecret: string;
}
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = environment;
  http = inject(HttpClient);

  createPaymentIntent(amount: number): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(
      `http://localhost:3400/payment/create-payment-intent`,
      { amount },
    );
  }
}
