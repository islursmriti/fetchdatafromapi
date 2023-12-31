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
  selectedPanelName: string | undefined;
  isMapVisible: boolean = false;
  selectedMarker: { lat: number, lng: number } | null = null;

  //constructor(private http: HttpClient) { }
   public users: res[]=[];
   tableData: any[] = [];
   isSidebarOpen = false; 
  // public ngOnInit():void {
  //   // Make a GET request to the URL containing the JSON data
  //   this.http.get('https://uat.utopiatech.in:4520/panel/gettestlist?org_id=3').subscribe((response) => {
  //       // Extract the JSON data from the response
  //        this.users = response;

  //       // Use the JSON data in your component as needed
  //       //console.log(this.users);
  //     });
  // }
  showMap(panel: res) {
    this.isMapVisible = true;

    const mapOptions: google.maps.MapOptions = {
      center: { lat: panel.Lat, lng: panel.Lng }, // Set the map center based on the panel's coordinates
      zoom: 10, // Initial zoom level
    };
    const mapContainer = document.getElementById('map');

    if (mapContainer) {
      const map = new google.maps.Map(mapContainer, mapOptions);

      // Create a marker on the map
      const marker = new google.maps.Marker({
        position: { lat: panel.Lat, lng: panel.Lng },
        map: map,
        title: panel.panel_name
      });

      // Add a click event listener to the marker
      marker.addListener('click', () => {
        this.selectedMarker = { lat: panel.Lat, lng: panel.Lng };
      });
    }
  }
    //const mapContainer = document.getElementById('map');
  constructor(private getAPI: GetServiceService) {}
  ngOnInit() {
    this.getAPI.getData().pipe(pluck("result")).subscribe(r => {
      this.users=r;
        console.log(r);
        
      });
  }

  createSidebarTable(l: string) {
    
   this.selectedPanelName=l;
    for(const pn of this.users){
    if(l==pn.panel_name){
      //console.log(l);
       this.tableData = [
        { Parameters: 'Voltage Status', R_Phase: pn.r_volt_status },
        { Parameters: 'MCB Status', R_Phase: pn.r_mcb_status },
        { Parameters: 'Load Status', R_Phase: pn.r_load_status },
        { Parameters: 'PF Status', R_Phase: pn.r_pf_status },
      ];
    }} 
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  closeMapSidebar() {
    this.isMapVisible = false;
    this.selectedMarker = null;
  }
}
