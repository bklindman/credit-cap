import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { CardListComponent } from './card-list/card-list.component';
import { RecommendedCardsComponent } from './recommended-cards/recommended-cards.component';
import { ViewAvailableCardsComponent } from './view-available-cards/view-available-cards.component';
const routes: Routes= [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'cards', component: ViewAvailableCardsComponent, canActivate: [AuthGuard]},
  {path: 'cards/recommend', component: RecommendedCardsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
