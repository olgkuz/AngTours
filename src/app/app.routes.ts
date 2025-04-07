import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { ToursComponent } from './pages/tours/tours.component';
import { TourIteamComponent } from './pages/tour-iteam/tour-iteam.component';
import { authGuard } from './shared/guards/auth.guard';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChangePasswordComponent } from './pages/settings/change-password/change-password.component';
import { StatisticComponent } from './pages/settings/statistic/statistic.component';

export const routes: Routes = [
    { path: 'auth', component: AuthComponent}, 
    { path: '',   redirectTo: '/auth', pathMatch: 'full' },
    
    { path:'tours', 
        canActivate:[authGuard],
        component: LayoutComponent,
        children:[
            { path:'',component:ToursComponent, data:{showAside:true}},
            { path:'tour/:id', component:TourIteamComponent},
            { path: 'tour', redirectTo:'', pathMatch:'full'},
                { path: 'settings', 
                    canActivate: [authGuard],    
                    component: SettingsComponent,
                    children:[
                        { path:'', redirectTo:'change-password', pathMatch: 'full',},
                        { path:'change-password', component: ChangePasswordComponent},
                        { path:'statistic', component: StatisticComponent, data:{showAside:true}},
                    ],
                }, 
            
            { path: '**', redirectTo: '/auth', pathMatch: 'full' }, 
        ]
    }
    ]
