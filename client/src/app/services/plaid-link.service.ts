import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaidLinkService {

  url = '/api/plaid';
  constructor(private http: HttpClient) { }

  public integrateLink(public_token : String, metadata: String){
    return this.http.post(`${this.url}/get_access_token`, {
      public_token,
      metadata
    });
  }
}
