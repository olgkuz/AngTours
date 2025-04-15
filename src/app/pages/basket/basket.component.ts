import { Component, inject } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { TableModule } from 'primeng/table';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-basket',
  imports: [TableModule,AsyncPipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  basketItems$ = inject(BasketService).basketStore$;
 }
