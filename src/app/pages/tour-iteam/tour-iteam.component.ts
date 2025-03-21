import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToursService } from '../../services/tours.service';

@Component({
  selector: 'app-tour-iteam',
  imports: [],
  templateUrl: './tour-iteam.component.html',
  styleUrl: './tour-iteam.component.scss',
})
export class TourIteamComponent  implements OnInit{ 
  tourId:string = null;
  constructor(private tourService: ToursService, private route:ActivatedRoute){}

  ngOnInit():void {
    this.tourId = this.route.snapshot.paramMap.get('id');
    console.log('tourId', this.tourId)
  }
  }

