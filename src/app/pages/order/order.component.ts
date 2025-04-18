import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ITour } from '../../models/tours';
import { ToursService } from '../../services/tours.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  InputTextModule } from 'primeng/inputtext';
import { InputNumberModule,  } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { NgTemplateOutlet } from '@angular/common';


@Component({
  selector: 'app-order',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    DatePickerModule,
    ButtonModule,
    NgTemplateOutlet


  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit{
  tourId: string = null;
  tour: ITour;
  userForm : FormGroup;
  userFormFiledsArr=[
    {label: 'Имя', placeHolder:'Введите имя', control: 'firstName'},
    {label: 'Фамилия ', placeHolder:'Введите фамилию', control: 'lastName'},
    {label: 'Номер карты', placeHolder:'Введите номер карты', control: 'cardNumber'},
  ]


  constructor(
    private tourService: ToursService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
  this.tourId =  this.route.snapshot.paramMap.get('id');
  this.tourService.getTourById(this.tourId).subscribe((tour)=> {
    this.tour = tour;
  })

  this.userForm = new FormGroup ({
    firstName: new FormControl('', {validators: Validators.required}),
    lastNmae: new FormControl('',[ Validators.required, Validators.minLength(2)]),
    cardNumber: new FormControl('',[ Validators.required, Validators.minLength(3)]),
    birthDate: new FormControl('',[ Validators.required]),
    age: new FormControl('',[ Validators.required]),
    citizenship: new FormControl('',[ Validators.required])
  })
}
  initOrder():void{
    const userLogin = this.userService.getUser().login;
    const personalData = this.userForm.getRawValue();
    const postObj = {
      userLogin,
      tourId: this.tourId,
      personalData:[personalData]

    }
    this.tourService.postOrder(postObj).subscribe()
  }
}
