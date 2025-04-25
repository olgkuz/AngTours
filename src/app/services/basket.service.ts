import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITour } from '../models/tours';

const BasketStorageKey = 'basket_store';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketStore: ITour[] = [];

  private basketSubject = new BehaviorSubject<ITour[]>([]);
  basketStore$ = this.basketSubject.asObservable();

  constructor() {
    this.loadFromStorage();
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
    sessionStorage.setItem(BasketStorageKey, JSON.stringify(this.basketStore));
  }

  private loadFromStorage(): void {
    const data = sessionStorage.getItem(BasketStorageKey);
    if (data) {
      try {
        const parsed: ITour[] = JSON.parse(data);
        this.basketStore = parsed;
        this.basketStore.forEach(t => t.inBasket = true);
        this.basketSubject.next([...this.basketStore]);
      } catch (e) {
        console.error('Ошибка при восстановлении корзины из sessionStorage:', e);
        this.basketStore = [];
        sessionStorage.removeItem(BasketStorageKey);
      }
    }
  }
}
