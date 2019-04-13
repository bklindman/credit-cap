import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { UserLogin } from './interfaces/UserLogin';
import { UserStore } from './interfaces/UserStore';
import { UserSignup } from './interfaces/UserSignup';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authUrl = "/auth/users";

  constructor(private http: HttpClient) { }

  signUp(user: UserSignup){
    return this.http.post<UserStore>(this.authUrl, user);
  }

  logIn(user: UserLogin){
    return this.http.post<UserStore>(this.authUrl+"/login", user);
  }

  logOut() {
    return this.http.get(`${this.authUrl}/logout`);
  }

  isAuthenticated(): boolean {
    let info = localStorage.getItem('user');
    if(!info){
      return false;
    }
    let user: UserStore = JSON.parse(info);
    let expired: boolean = (new Date(user.expiry)) < new Date();
    if (expired) this.deleteLocalStorage();
    return !expired;
  }

  public deleteLocalStorage(): void {
    localStorage.removeItem('user');
  }

  public getUserStore(): UserStore{
    if(this.isAuthenticated()){
      let info = localStorage.getItem('user');
      let user: UserStore = JSON.parse(info);
      return user;
    }
  }
}
