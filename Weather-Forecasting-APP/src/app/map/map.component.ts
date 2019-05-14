import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { } from 'googlemaps';
import { WeatherServiceService } from '../weather-service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  show: any={};
  v1: number;
  @Output() send: EventEmitter<any> = new EventEmitter<any>();
  constructor(private weatherServiceService: WeatherServiceService) { }

  ngOnInit(): void {

    this.weatherServiceService.getPosition().then(pos => {

      var lat = pos.lat;
      var lon = pos.lng;
      var latT = lat.toFixed(4);
      var lonT = lon.toFixed(4);
      const mapProperties = {
        center: new google.maps.LatLng(latT, lonT),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

      google.maps.event.addListener(this.map, 'click', (event) => {

        var latC = event.latLng.lat();
        var lonC = event.latLng.lng();
        var latCT = latC.toFixed(4);
        var lonCT = lonC.toFixed(4);
        this.v1 = latCT;

        this.weatherServiceService.getWeatherReport(latCT, lonCT).subscribe((data: any[]) => {
         this.send.emit(data)
          this.show = data

        });

      })

    });

  }
}
