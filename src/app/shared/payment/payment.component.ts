import {
  AfterViewChecked,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import {
  Stripe,
  StripeCardElement,
  StripeElements,
  loadStripe,
} from '@stripe/stripe-js';
import { PaymentService } from '../../core/payment/payment.service';
import { CommonModule, NgIf } from '@angular/common';
import { Item } from '../../core/entities/item.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit, AfterViewChecked {
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  errorMessage: string | null = null;
  showModal: boolean = false;
  showCheckoutForm: boolean = false;
  paymentService = inject(PaymentService);
  @Input() itemInfo!: Item;

  async ngOnInit() {
    this.stripe = await loadStripe(
      'pk_test_51PHCenDHHHMG1QR5rjKjekr00lJh14cZTnqIa7INWa9Xun6iwALsa06FKguT45MpzHmry1UwC1S7dQr27qviVyqn00EENljSAK',
    );
  }

  ngAfterViewChecked() {
    if (this.showCheckoutForm && !this.card) {
      this.initializeStripe();
    }
  }
  async initializeStripe() {
    if (this.stripe && !this.card) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    }
  }

  async handlePayment(price: string) {
    if (!this.stripe || !this.card) {
      return;
    }
    const priceNumber = Number(price) * 100;
    this.paymentService.createPaymentIntent(priceNumber).subscribe({
      next: async (response) => {
        const clientSecret = response.clientSecret;
        const { error, paymentIntent } = await this.stripe!.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: this.card!,
            },
          },
        );

        if (error) {
          console.error(error);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          console.log('Payment succeeded!');
          this.showModal = true;
        }
      },
      error: (err) => {
        console.error('Error creating payment intent:', err);
      },
    });
  }
  closeModal() {
    this.showModal = false;
  }
}
