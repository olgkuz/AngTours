import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TableModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orders: {
    userLogin: string;
    tourId: string;
    touristCount: number;
    fullNames: string;
  }[] = [];

  destroy$ = new Subject();

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrders()
      .pipe(
        takeUntil(this.destroy$),
        map(orders =>
          orders.map(order => ({
            userLogin: order.userLogin,
            tourId: order.tourId,
            touristCount: order.personalData?.length || 0,
            fullNames: order.personalData
              .map(p => `${p.firstName} ${p.lastName}`)
              .join(', ')
          }))
        )
      )
      .subscribe({
        next: (data) => (this.orders = data),
        error: (err) => console.error('Ошибка при получении заказов:', err)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
