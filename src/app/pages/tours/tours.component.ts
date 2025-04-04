import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule} from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { ITour } from '../../models/tours';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import {isValid } from "date-fns";
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
export class ToursComponent implements OnInit {

  
  tours: ITour[]=[];
  toursStore:ITour []=[];
  searchValue = ''; 

  constructor( 
    private toursService:ToursService,
    private route:ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    //Type
    this.toursService.tourType$.subscribe((tour)=>{
      console.log('tour',tour)
      switch (tour.key) {
        case 'group':
          this.tours = this.toursStore.filter((el)=> el.type === 'group')
        break; 
        case 'single':
          this.tours = this.toursStore.filter((el)=> el.type === 'single')
        break; 
        case 'all':
        break;  
      }
    })

    //Date
    this.toursService.tourDate$.subscribe((date) => {
      console.log('****date',date)

      this.tours = this.toursStore.filter((tour) => {
        if (isValid(new Date(tour.date))) {

          const tourDate = new Date(tour.date).setHours(0,0,0,0);
          console.log ('*****tourDate',tourDate)
          const calendarDate = new Date (date).setHours(0,0,0)
          console.log ('*****calendarDate',tourDate)
          return tourDate === calendarDate;
        } else {
          return false;
        }
        });
      })
    
    
    this.toursService.getTours().subscribe((data)=>{
      if (Array.isArray(data?.tours)) {
        this.tours = data.tours;
        this.toursStore = [...data.tours];
      }
    });
    
  }
  goToTour (iteam:ITour): void {
    this.router.navigate(['tour',iteam.id],{relativeTo: this.route})
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