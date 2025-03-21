import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';

import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth',
  imports: [AuthorizationComponent,RegistrationComponent,TabsModule,Toast],
  providers:[MessageService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy{

  ngOnInit(): void {
    console.log ('init')
  }
  ngOnDestroy(): void {
    console.log ('destr')
  }
}
