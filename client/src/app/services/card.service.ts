import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditCard } from '../interfaces/CreditCard';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  url = "/api/cards";
  constructor(private http: HttpClient) { }

  public getAllCreditCards(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(this.url);
  }

  public recommendCards(): Observable<CreditCard[]>{
    return this.http.get<CreditCard[]>(`${this.url}/recommend`);
  }
}
