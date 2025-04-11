import { Component, OnInit, inject} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from "primeng/select";
import { ToursService } from '../../services/tours.service';
import { DatePickerModule } from 'primeng/datepicker';
import { IFilterTypeLogic } from '../../models/tours';

@Component({
  selector: 'app-aside',
  imports: [SelectModule,FormsModule,DatePickerModule ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent  implements OnInit {
  private tourService = inject(ToursService);

  date: Date = null; // или Date ()

  selectedType: IFilterTypeLogic = null; // TODO defined type

  tourTypes: IFilterTypeLogic[]= [                             // TODO defined type
    {key: 'single', label: 'Одиночный'},
    {key: 'group', label: 'Груповой'},
    {key: 'all', label: 'Все'}
  ]
  
  ngOnInit(): void {
    this.selectedType = this.tourTypes.find((type)=> type.key === 'all'); 
    
  }
  changeTourType(ev:SelectChangeEvent): void {
    this.tourService.initChangeTourType (this.selectedType);
  }
  changeDate (ev:Date): void {
    console.log('date', ev);
    this.tourService.initChangeTourDate(ev);
    
    }
   clearDate(): void{
    this.tourService.initChangeTourDate(null);
   } 
}



