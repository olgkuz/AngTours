import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule,FooterComponent,HeaderComponent,AsideComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{ 
  constructor() {}
  ngOnInit(): void {
    
  }

}
