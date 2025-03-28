import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToursService } from '../../services/tours.service';
import { ITour } from '../../models/tours';
import { ButtonModule } from 'primeng/button';
import {  NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { NearestToursComponent } from './nearest-tours/nearest-tours.component';

@Component({
  selector: 'app-tour-iteam',
  imports: [ButtonModule,CardModule,RouterLink, NearestToursComponent ],
  templateUrl: './tour-iteam.component.html',
  styleUrl: './tour-iteam.component.scss',
})
export class TourIteamComponent  implements OnInit{ 
  tourId:string ;
  tour:ITour ;
  constructor(
    private tourService: ToursService, 
    private route:ActivatedRoute){}

  ngOnInit():void {
    this.tourId = this.route.snapshot.paramMap.get('id');
    this.tourService.getTourById(this.tourId).subscribe((tour)=>{
  
    this.tour = tour;
 
  });
}
}