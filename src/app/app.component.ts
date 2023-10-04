import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { pluck } from "rxjs/operators";
import { GetServiceService } from "./service/data.service";

 interface utopia{
  statusCode: number;
  status: string;
  statusMessage: string;
  result: res[];
}
 interface res{
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

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //constructor(private http: HttpClient) { }
   public users: res[]=[];
  // public ngOnInit():void {
  //   // Make a GET request to the URL containing the JSON data
  //   this.http.get('https://uat.utopiatech.in:4520/panel/gettestlist?org_id=3').subscribe((response) => {
  //       // Extract the JSON data from the response
  //        this.users = response;

  //       // Use the JSON data in your component as needed
  //       //console.log(this.users);
  //     });
  // }
  constructor(private getAPI: GetServiceService) {}
  ngOnInit() {
    this.getAPI.getData().pipe(pluck("result")).subscribe(r => {
      this.users=r;
        console.log(r);
      });
  }
}