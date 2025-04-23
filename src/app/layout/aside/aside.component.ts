import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from "primeng/select";
import { CheckboxModule } from 'primeng/checkbox';
import { ToursService } from '../../services/tours.service';
import { DatePickerModule } from 'primeng/datepicker';
import { IFilterTypeLogic } from '../../models/tours';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [SelectModule, CheckboxModule, FormsModule, DatePickerModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent implements OnInit {
  private tourService = inject(ToursService);

  date: Date = null;
  selectedType: IFilterTypeLogic = null;

  tourTypes: IFilterTypeLogic[] = [
    { key: 'single', label: 'Одиночный' },
    { key: 'group', label: 'Групповой' },
    { key: 'all', label: 'Все' }
  ];

  showOnlyInBasket: boolean = false;

  ngOnInit(): void {
    this.selectedType = this.tourTypes.find(t => t.key === 'all');
  }

  changeTourType(): void {
    this.tourService.initChangeTourType(this.selectedType);
  }

  changeDate(ev: Date): void {
    this.tourService.initChangeTourDate(ev);
  }

  clearDate(): void {
    this.tourService.initChangeTourDate(null);
  }

  onToggleBasketFilter(): void {
    this.tourService.initChangeBasketFilter(this.showOnlyInBasket);
  }
}



