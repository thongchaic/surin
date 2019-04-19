import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  Environment
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent implements OnInit {

  map: GoogleMap;

  constructor(
    private platform: Platform,
  ) { }

  ngOnInit() {}

  ionViewDidLoad() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyA4ftkZaeFPuzyWhzztN7kX7VpBxfAMvsI',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyA4ftkZaeFPuzyWhzztN7kX7VpBxfAMvsI'
    });
  }

  async ionViewDidEnter() {      
    await this.platform.ready();
    await this.loadMap();  
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });
  } 

}
