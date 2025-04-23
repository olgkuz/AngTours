import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITour } from '../models/tours';

const BASKET_STORAGE_KEY = 'basket_store';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketStore: ITour[] = [];

  private basketSubject = new BehaviorSubject<ITour[]>([]);
  basketStore$ = this.basketSubject.asObservable();

  constructor() {
    this.loadFromStorage(); //  восстановление при запуске
  }

  setItemToBasket(item: ITour): void {
    this.basketStore.push(item);
    item.inBasket = true;
    this.updateStore();
  }

  removeItemFromBasket(item: ITour): void {
    this.basketStore = this.basketStore.filter(t => t.id !== item.id);
    item.inBasket = false;
    this.updateStore();
  }

  getCurrentBasket(): ITour[] {
    return [...this.basketStore];
  }

  private updateStore(): void {
    this.basketSubject.next([...this.basketStore]);
    localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(this.basketStore));
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem(BASKET_STORAGE_KEY);
    if (data) {
      try {
        const parsed: ITour[] = JSON.parse(data);
        this.basketStore = parsed;
        
        this.basketStore.forEach(t => t.inBasket = true);
        this.basketSubject.next([...this.basketStore]);
      } catch (e) {
        console.error('Ошибка при восстановлении корзины:', e);
        this.basketStore = [];
        localStorage.removeItem(BASKET_STORAGE_KEY);
      }
    }
  }
}
