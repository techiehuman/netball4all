import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Player } from './player';
import { States } from './states';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Season } from './season';
import { Notifications } from './notifications';




@Injectable({
  providedIn: 'root'
})
export class RestService {

  baseUrl:string = "https://lyonsdemoz.website/netball4all/";
 
  public seasonName : string = "";
  public stateName : string = "";

    


  constructor(private  httpClient : HttpClient) { }

  // Sending a GET request to /products

  // Sending a GET request to /products/:id
  public  getPlayerDetailsById(playerId: number) : Observable<Player> {

    let api: string = "api/get-player-details/";
    return  this.httpClient .get(this.baseUrl + api + playerId).pipe(map((response: any)  => {

        return  new  Player(response.data);

    }));

  }

  public login(data) : Observable<Player> {
    let api: string = "api/player-login";

    var formData: any = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
  
    alert(this.baseUrl + api);
    alert(JSON.stringify(data));

    return  this.httpClient .post(this.baseUrl + api, formData).pipe(map((response: any)  => {
      alert(JSON.stringify(response));

        return  new  Player(response.data);
    }));
  }

  public updateProfile(data,playerId: number) : Observable<Player> {
    let api: string = "api/update-player-details/";

    var formData: any = new FormData();
    console.log(data);
    formData.append("username", data.emailaddress);
    formData.append("picture", data.picture);
    formData.append("team",data.team);
    formData.append("mobile",data.mobile);
    formData.append("state",data.state);
    formData.append("street_address",data.street_address);
    formData.append("subrub",data.subrub);
    formData.append("postcode",data.postcode);
    formData.append("emergency_phone_number",data.emergency_phone_number);
    formData.append("emergency_contact_person",data.emergency_contact_person);

    console.log(formData);
    
    return  this.httpClient .put(this.baseUrl + api+playerId, data).pipe(map((response: any)  => {
      console.log(response)
        return  new  Player(response.data);
    }));
  }
 
  sendPostRequest(username: string, password: string): Observable<Player> {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let postData = {
            "username": username,
            "password": password,
    }

    let api: string = "api/player-login";
    return  this.httpClient .post(this.baseUrl + api, postData).pipe(map((response: any)  => {

        return  new Player(response.data);

    }));
  }

  public  getNotifications() : Observable<Notifications[]> {

    let api: string = "api/get-all-notifications";
    return  this.httpClient .get(this.baseUrl + api ).pipe(map((response: any)  => {
      let notifications = response.data;
      console.log(response.data)

        return  notifications.map((notification: Notifications) => new Notifications(notification));
    }));

  }
  public  getStateList(): Observable<States[]> {
    let api: string = "api/get-all-states";

    return this.httpClient.get(this.baseUrl + api).pipe(map((stateResp: any) => {
              let states = stateResp.data;
      return  states.map((state: States) => new States(state));
    }));
  }

  public  getSeasonList(): Observable<Season[]> {
    let api: string = "api/get-all-seasons";

    return this.httpClient.get(this.baseUrl + api).pipe(map((seasonResp: any) => {
              let seasons = seasonResp.data;
      return  seasons.map((season: Season) => new Season(season));
    }));
  }

  public getSeasonName(seasonID:number, seasonList : Array<Season>) : string {

 
        for(let i=0;i<seasonList.length;i++){
            if(seasonID == seasonList[i].id){
             this.seasonName = seasonList[i].season;
            }
        }
       
          return this.seasonName;
    
  }

  public getStateName(stateID:number, stateList : Array<States>) : string {

    for(let i=0;i<stateList.length;i++){
        if(stateID == stateList[i].id){
         this.stateName = stateList[i].name;
        }
    }
   
      return this.stateName;

}
}
