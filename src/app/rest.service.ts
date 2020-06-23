import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Player } from './player';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  baseUrl:string = "http://lyonsdemoz.website/netball4all/";

  constructor(private  httpClient : HttpClient) { }

  // Sending a GET request to /products

  // Sending a GET request to /products/:id
  public  getPlayerDetailsById(playerId: number) : Observable<Player> {

    let api: string = "api/get-player-details/";
    return  this.httpClient .get(this.baseUrl + api + playerId).pipe(map((response: any)  => {

        return  new  Player(response.data);

    }));

  }

}
