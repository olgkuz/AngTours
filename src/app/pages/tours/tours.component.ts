import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule} from 'primeng/card';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-tours',
  imports: [CardModule],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
})
export class ToursComponent implements OnInit {

  
  tours: any=[];

  
  
  
  constructor( private tourService:ToursService,
    private route:ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    
    this.toursService.getTours().subscribe((data)=>{
      if (Array.isArray(data?.tours)) {
        this.tours = data.tours;
      }
    });
    
  }
  goToTour (iteam:any): void {
    this.router.navigate(['tour',iteam.id],{relativeTo: this.route})
  }
}
