import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapComponent } from './map/map.component';


@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  la: number;
  lo: number;
  
  
  constructor(private http: HttpClient) { }



  getWeatherReport(lat: number, lon: number) {


    var APIWeather = "http://api.apixu.com/v1/current.json?key=3f165ea7fe81406c92a50735192903&q=" + lat + "," + lon;
    return this.http.get(APIWeather);
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }
  clickMapFunction(vlat: number, vlon: number) {

  }

}
