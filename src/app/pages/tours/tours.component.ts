import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule} from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilterTypeLogic, ILocation, ITour, IWeatherData } from '../../models/tours';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import {isValid } from "date-fns";
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MapComponent } from '../../shared/components/map/map.component';
import { DialogModule } from 'primeng/dialog'
import { ConfirmationService, MessageService } from 'primeng/api';
import { BasketService } from '../../services/basket.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tours',
  imports: [
    CardModule,
    CommonModule, 
    InputGroupModule,
    InputGroupAddonModule, 
    ButtonModule,
    InputText,
    SearchPipe,
    FormsModule,
    HighlightActiveDirective,
    MapComponent,
    DialogModule
  ],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
})
export class ToursComponent implements OnInit, OnDestroy {
 
  tours: ITour[]=[];
  toursStore:ITour []=[];
  dateTourFilter: Date;
  typeTourFilter:IFilterTypeLogic = {key: 'all'}
  destroyer = new Subject<boolean>();
  showModal = false;
  location: ILocation = null;
  selectedTour: ITour = null;
  weatherData: IWeatherData | null = null;
  isAdmin:boolean = false;


  constructor( 
    private toursService:ToursService,
    private route:ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    

    //Type
    this.userIsAdmin();
    
    
    this.toursService.tourType$.pipe(takeUntil(this.destroyer)).subscribe((tour)=> {
      console.log('tour',tour)
      this.typeTourFilter = tour;
      this.initTourFilterLogic();
    });

    //Date
     this.toursService.tourDate$.pipe(takeUntil(this.destroyer)).subscribe((date) => {
      this.dateTourFilter = date;
      console.log('****date',date);
      this.initTourFilterLogic()
      });
    
    console.log('activetedRouter', this.route)
    this.toursService.getTours().subscribe((data)=>{
      if (Array.isArray(data)) {
        this.tours = data;
        this.toursStore = [...data];
      }
    },(err)=>{
      console.log('****',err)
    });
    
  }
  
  
  

  userIsAdmin(): void {
  const userData = sessionStorage.getItem('current_user')
  if(userData) {
    const user = JSON.parse(userData)
    this.isAdmin = user.login === 'admin';

  } else {
    this.isAdmin = false;
  }
}
 
  ngOnDestroy(): void {
    this.destroyer.next(true);
    this.destroyer.complete();
  }
  
  goToTour (item:ITour): void {
    this.router.navigate(['tour',item.id],{relativeTo: this.route})
  }
  searchTour(ev:Event): void {
    const target = ev.target as HTMLInputElement;
    const targetValue = target.value;
    this.tours = this.toursService.searchTours(this.toursStore,targetValue);
  }

  selectActive (index: number):void {
   
    const targetTour = this.tours.find((tour, i) => i === index);
    if (targetTour) {
      this.goToTour(targetTour);
    }
  }
  
   initTourFilterLogic():void{
    //logic for type
    if (this.typeTourFilter){
      switch (this.typeTourFilter.key){
        case 'group':
          this.tours = this.toursStore.filter((el)=> el.type === 'group')
        break;
        case 'single':
          this.tours = this.toursStore.filter((el)=> el.type === 'single')
        break;
        case 'all':
          this.tours =[...this.toursStore] 
        break;

      }
    }
    //logic for date
    if(this.dateTourFilter) {
      this.tours = this.tours.filter((tour)=> {
        if(this.dateTourFilter && isValid(new Date(this.dateTourFilter))){
          const tourDate = new Date(tour.date).setHours(0, 0, 0);
          const calendarDate =new Date (this.dateTourFilter).setHours(0, 0, 0)
          return tourDate === calendarDate;
        } else {
          return false;
        }
      });
    }
   }
   getCountryDetail(ev: Event, code:string, tour:ITour): void {

    ev.stopPropagation(); 
    this.toursService.getCountryByCode(code).subscribe((data)=> {
      if (data) {
        const countrieInfo = data.countrieData;
        console.log('countrieInfo',countrieInfo)
        this.location = {lat: countrieInfo.latlng[0], lng: countrieInfo.latlng[1]};
        this.showModal = true;
      }
    });
   }

   removeTour(tourId:string, ev:Event): void {
    ev.stopPropagation();
    this.confirmationService.confirm({
      message: `Вы уверены, что хотите удалить тур ?`,
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => {
      
    
  this.toursService.deleteTourById(tourId).subscribe({
    next:()=> {
      this.tours = this.tours.filter(tour => tour.id !== tourId);
      this.messageService.add({severity: 'success',summary: ' Успех ', detail: ' Тур удален'});
    },
    error: ()=> {
      this.messageService.add({ severity:'error',summary: 'Ошибка', detail: 'Тур не удален'});
    },

  });
},

})
}



   
   setItemToBasket(ev: Event, item: ITour): void {
    ev.stopPropagation();
    this.basketService.setItemToBasket(item);
   }
   removeItemFromBasket(ev: Event, item:ITour): void {
    ev.stopPropagation();
    this.basketService.removeItemFromBasket(item);
 
  }
}