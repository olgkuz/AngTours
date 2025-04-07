import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule} from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilterTypeLogic, ITour } from '../../models/tours';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import {isValid } from "date-fns";
import { Subject, Subscription, takeUntil } from 'rxjs';
@Component({
  selector: 'app-tours',
  imports: [
    CardModule,
    InputGroupModule,
    InputGroupAddonModule, 
    ButtonModule,
    InputText,
    SearchPipe,
    FormsModule,
    HighlightActiveDirective
  ],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
})
export class ToursComponent implements OnInit, OnDestroy {
 

  
  tours: ITour[]=[];
  toursStore:ITour []=[];
  searchValue = ''; 
  dateTourFilter: Date;
  typeTourFilter:IFilterTypeLogic = {key: 'all'}
  
  destroyer = new Subject<boolean>();



  constructor( 
    private toursService:ToursService,
    private route:ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    //Type
    this.toursService.tourType$.pipe(
      takeUntil(this.destroyer)

    ).subscribe((tour)=>{
      console.log('tour',tour)
      this.typeTourFilter = tour;
      this.initTourFilterLogic();
    });

    //Date
     this.toursService.tourDate$.pipe(
      takeUntil(this.destroyer)
      
    ).subscribe((date) => {
      this.dateTourFilter = date;
      console.log('****date',date);
      this.initTourFilterLogic()
      });
    
    
    this.toursService.getTours().subscribe((data)=>{
      if (Array.isArray(data?.tours)) {
        this.tours = data.tours;
        this.toursStore = [...data.tours];
      }
    });
    
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
    console.log('index',index);
    const targetTour = this.tours.find((tour, i) => i === index);
    if (targetTour) {
      this.goToTour(targetTour);
    }
  }
  }