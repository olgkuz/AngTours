import { AfterViewInit, Component, ElementRef, EventEmitter, inject, 
  input, 
  Input, model, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ITour } from '../../../models/tours';
import { ToursService } from '../../../services/tours.service';
import { GalleriaModule } from 'primeng/galleria';
import { NgOptimizedImage } from '@angular/common';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { fromEvent,  Subscription } from 'rxjs';

@Component({
  selector: 'app-nearest-tours',
  imports: [
    GalleriaModule, 
    NgOptimizedImage,
    InputGroup,
    InputGroupAddon,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './nearest-tours.component.html',
  styleUrl: './nearest-tours.component.scss',
})
export class NearestToursComponent implements OnInit, OnChanges, AfterViewInit,OnDestroy {
 

  @Input() tourNearest:ITour = null;
  @Output () onTourChange = new EventEmitter<ITour> ();

  @ViewChild('searchInput') searchInput: ElementRef; 

  tourService = inject(ToursService);
  toursArr = model<ITour[]>([]);
  toursArrCopy = model<ITour[]>([]);
  activeLocationId:string;
  subscription:Subscription;

ngOnInit():void {

} 

ngOnChanges(changes: SimpleChanges): void {
  console.log ('changes', changes)
  const tour = changes['tourNearest']?.currentValue as ITour;

  if (tour?.locationId && this.activeLocationId !== tour?.locationId) {
    this.activeLocationId = tour?.locationId;
    this.tourService.getNearestTourByLocationId( this.activeLocationId).subscribe((data)=>{
      this.toursArr.set(data);
      this.toursArrCopy.set(data);
    });
  }
}
ngAfterViewInit(): void {
  console.log('searchInput afterView',this.searchInput)
  const eventObservable = fromEvent<InputEvent> (this.searchInput.nativeElement, 'input')

   this.subscription =  eventObservable.subscribe((ev)=> {
    const inputTargetValue = (ev.target as HTMLInputElement).value;
    console.log('inputTargetValue',inputTargetValue, this.toursArr())
    if(inputTargetValue ===''){
      this.toursArr.set(this.toursArrCopy());

    } else { 
      const newTours = this.tourService.searchTours(this.toursArrCopy(),inputTargetValue);
      this.toursArr.set(newTours);
    } 
    
  });
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
activeIndexChange (index:number){
const tours = this.toursArr();
const activeTour = tours.find((el, i)=> i === index);

this.onTourChange.emit(activeTour);
}
}