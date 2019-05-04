import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { UserLogin } from './interfaces/UserLogin';
import { UserStore } from './interfaces/UserStore';
import { UserSignup } from './interfaces/UserSignup';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authUrl = "/auth/users";
  private user: UserStore;
  public userStoreChange: BehaviorSubject<any> = new BehaviorSubject<any>({});
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
    this.userStoreChange.next(null);
  }

  public getUserStore(): UserStore{
    if(this.isAuthenticated()){
      return this.user;
    }
  }

  public setUserStore(res: UserStore): void{
    localStorage.setItem("user", JSON.stringify(res));
    this.user = res;
    this.userStoreChange.next(this.user);
  }

  public updateUserStore(key, value){
    this.user[key] = value;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.userStoreChange.next(this.user);
  }
}
