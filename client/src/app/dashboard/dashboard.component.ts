import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { environment } from '../../environments/environment';
import { PlaidLinkService } from '../services/plaid-link.service';
import { UserStore } from '../interfaces/UserStore';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
declare let Plaid: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user: UserStore;
  private handler: any;

  constructor(private authService: AuthenticationService, private plaidService: PlaidLinkService) {}

  ngOnInit() {
    this.authService.userStoreChange.subscribe((user) => {
      this.user = user;
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
    });
  }

  goToLink(){
    this.handler.open();
  }

  getName(){
    return this.authService.getUserStore().name;
  }

}
