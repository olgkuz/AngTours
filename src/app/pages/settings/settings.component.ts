import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-settings',
  imports: [ButtonModule, RouterLink,CommonModule,RouterModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent { 
  menuIteams = [
    {path: 'statistic',
      label: 'Статистика'
    },

    { path: 'change-password',
      label: 'Смена пароля'},
    
  ];
}
