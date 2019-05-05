import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserBank } from '../interfaces/UserBank';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private route = '/user';

  constructor(private http: HttpClient) { }

  public getAccounts(): Observable<UserBank[]>{
    return this.http.get<UserBank[]>(`${this.route}/accounts`);
  }
}
