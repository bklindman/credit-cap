import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(private authService: AuthenticationService){

  }

  onLogout(){
    this.authService.logOut().subscribe(res => {
      this.authService.deleteLocalStorage();
    });
  }
}
