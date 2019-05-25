import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialCompsModule } from './material-comps.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoutingModule } from './routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogAddMoreAccountsComponent } from './dialog-add-more-accounts/dialog-add-more-accounts.component';
import { CardListComponent } from './card-list/card-list.component';
import { DecimalPipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    DialogAddMoreAccountsComponent,
    CardListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialCompsModule,
    FlexLayoutModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [AuthenticationService, DecimalPipe],
  bootstrap: [AppComponent],
  entryComponents: [DialogAddMoreAccountsComponent]
})
export class AppModule { }
