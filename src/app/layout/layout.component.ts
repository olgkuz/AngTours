import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { filter, Subscription,map } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, FooterComponent, HeaderComponent, AsideComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy{ 
   
  showAside = false;
  subscription: Subscription;
  constructor (private router: Router, private activatedRoute:ActivatedRoute ) {}

  ngOnInit(): void {

    this.showAside = this.recursFindChildData(this.activatedRoute.snapshot,'showAside')

    this.subscription=this.router.events.pipe(
      filter((routes)=> routes instanceof ActivationEnd),
      map((data)=>data.snapshot)

    ).subscribe((data) => {
      this.showAside = this.recursFindChildData(data,'showAside')
    }); 
    
  }
  recursFindChildData(children:ActivatedRouteSnapshot,prop: string):boolean {
    console.log( 'children', children)
    if (!children.data[prop] && children.firstChild){
      return this.recursFindChildData(children.firstChild,prop);
    }else{
      return !! children.data[prop];
    }
    }
    ngOnDestroy ():void {
      this.subscription.unsubscribe();
    }
  }

