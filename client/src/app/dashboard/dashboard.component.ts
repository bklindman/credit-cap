import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { environment } from '../../environments/environment';
import { PlaidLinkService } from '../services/plaid-link.service';
import { UserStore } from '../interfaces/UserStore';
import { UserService } from '../services/user.service';
import { UserBank } from '../interfaces/UserBank';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import * as chartSettings from './piechart-properties';
declare let Plaid: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user: UserStore;
  private handler: any;
  mediaQuery$: Subscription;
  activeMediaQuery: string;
  public userBanks: UserBank[] = [];
  expenses: any[];
  
  showLegend: boolean = chartSettings.showLegend;
  showLabels: boolean = chartSettings.showLabels;
  legendPosition: String = chartSettings.legendPosition;
  colorScheme = chartSettings.colorScheme;

  constructor(private authService: AuthenticationService,
     private plaidService: PlaidLinkService, 
     private userService: UserService,
     private mediaObserver: MediaObserver) {
       this.subscribeToMedia();
     }

  private subscribeToMedia(): void {
    this.mediaQuery$ = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change.mqAlias;
      if(this.activeMediaQuery === 'xs' || this.activeMediaQuery === 'sm'){
        this.showLabels = false;
        this.legendPosition = 'below';
      } else {
        this.showLabels = true;
        this.legendPosition = 'right';
      }
    });
  }

  ngOnInit() {
    this.authService.userStoreChange.subscribe((user) => {
      this.user = user;
      if(user && user.linked && !this.userBanks.length){
        this.getAccounts();
      }
    });
    let key = environment.key;
    this.handler = Plaid.create({
      clientName: 'CreditCap',
      countryCodes: ['US'],
      env: 'sandbox',
      key,
      product: ['transactions'],
      language: 'en',
      onSuccess: (public_token, metadata) => {
        this.getPublicToken(public_token, metadata);
      }
    });
  }

  getPublicToken(token: String, metadata: String){
    this.plaidService.integrateLink(token, metadata).subscribe((res) => {
      this.authService.updateUserStore("linked", true);
      this.getAccounts();
    });
  }

  goToLink(){
    this.handler.open();
  }

  getName(){
    return this.authService.getUserStore().name;
  }

  private getAccounts(): void {
    this.userService.getAccounts().subscribe((accounts) => {
      this.userBanks = accounts;
      this.getPurchaseOverview();
    });
  }

  private getPurchaseOverview(): void {
    this.userService.getExpensesOverview().subscribe((categories) => {
      this.expenses = categories;
    });
  }
}
