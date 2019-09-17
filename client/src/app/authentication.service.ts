import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { UserLogin } from './interfaces/UserLogin';
import { UserStore } from './interfaces/UserStore';
import { UserSignup } from './interfaces/UserSignup';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authUrl = "/api/auth/users";
  private user: UserStore;
  public userStoreChange: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) {
    this.user = this.getUserStore();
    this.userStoreChange.next(this.user);
   }

  signUp(user: UserSignup): Observable<UserStore> {
    return this.http.post<UserStore>(this.authUrl, user);
  }

  logIn(user: UserLogin): Observable<UserStore>{
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
      return JSON.parse(localStorage.getItem('user'));
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
