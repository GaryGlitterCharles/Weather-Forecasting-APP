import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { WeatherServiceService } from "../weather-service.service";
import { MapComponent } from "../map/map.component";

@Component({
  selector: "app-weather-show",
  templateUrl: "./weather-show.component.html",
  styleUrls: ["./weather-show.component.css"]
})
export class WeatherShowComponent implements OnInit {
  //show: any[];

  show: any = {};
  show2 :any ={};
  hide : boolean = false;

  lon: number;
  lat: number;

  latitude: number;
  longitude: number;

  constructor(private weatherServiceService: WeatherServiceService) {}

  ngOnInit() {
    
    this.weatherServiceService.getPosition().then(pos => {
      var lat = pos.lat;
      var lon = pos.lng;
      var latT = lat.toFixed(4);
      var lonT = lon.toFixed(4);
      this.latitude = latT;
      this.longitude = lonT;

      this.weatherServiceService
        .getWeatherReport(latT, lonT)
        .subscribe((data: any[]) => {
          this.show = data;
        });
    });
  
  }
  getFromMap(value : any){

    this.show2 = value
    this.hide = true
  }
}
