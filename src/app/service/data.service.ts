
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from "rxjs";

export interface utopia{
  statusCode: number;
  status: string;
  statusMessage: string;
  result: res[];
}
export interface res{
  Lat: number;
      Lng: number;
      r_volt_status: number;
      r_load_status: number;
      r_mcb_status: number;
      r_pf_status: number;
      _id: string;
      mac_id: string;
      panel_name: string;

}
@Injectable({
  providedIn: 'root'
})
// export class ApiService {

//   constructor(private http: HttpClient) { }

//   fetchNestedJsonData() {
//     return this.http.get('https://uat.utopiatech.in:4520/panel/gettestlist?org_id=3');
//   }
// }
export class GetServiceService {
  constructor(private httpClient: HttpClient) {}
  getData(): Observable<utopia> {
    return this.httpClient.get<utopia>('https://uat.utopiatech.in:4520/panel/gettestlist?org_id=3');}}