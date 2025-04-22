import { Component, inject } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { TableModule } from 'primeng/table';
import { AsyncPipe } from '@angular/common';
import { ITour } from '../../models/tours';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  imports: [
    TableModule, 
    AsyncPipe,
    ButtonModule
  ],

  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  basketService = inject(BasketService);
  basketItems$ = this.basketService.basketStore$;
  router = inject(Router);

  removeFromBasket(tour: ITour): void {
    this.basketService.removeItemFromBasket(tour);
  }
  goToOrder(): void {
    const currentBasket = this.basketService.getCurrentBasket();
    if (currentBasket.length) {
      const firstTourId = currentBasket[0].id;
      this.router.navigate(['/tours/order', firstTourId]);
    }
  }
}
