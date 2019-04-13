import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(private authService: AuthenticationService, private router: Router){

  }

  onLogout(){
    this.authService.logOut().subscribe(res => {
      this.authService.deleteLocalStorage();
      this.router.navigate(['']);
    });
  }

  isLoggedIn(){
    return this.authService.isAuthenticated();
  }
}
