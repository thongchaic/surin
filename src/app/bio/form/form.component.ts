import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit{
  @Input('formType') formType;
  @Input('organs') organs;
  @Output() submitChange = new EventEmitter();

  map: GoogleMap;
  lat: number = 14.858178;
  lng: number = 103.4900967;
  bioForm: FormGroup = this.formBuilder.group({
    name: [''],
    organs: [''],
    informant: [''],
    lat: [''],
    lng: [''],
    file_id: this.randomString(64, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    image: null
  });

  imageSrc = '';
  // apiKey: any = 'AIzaSyAqiHOgtttCiHMRunb67vOkcSoa5y9kQ14';
  typeTitle = 'พืช' || 'สัตว์';

  constructor(
    private camera: Camera,
    private formBuilder: FormBuilder,
    private platform: Platform,
    private webView: WebView,
    private imagePicker: ImagePicker,
    private geolocation: Geolocation,
    private file: File
  ) { }

  async ngOnInit() {

    if(this.formType === 'PLANT') {
      this.typeTitle = 'พืช';
    } else {
      this.typeTitle = 'สัตว์';
    }

    await this.platform.ready();
    await this.geolocation.getCurrentPosition().then(res => {
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
    })
    await this.loadMap();
  }

  submit() {
    this.submitChange.emit(this.bioForm.value);
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
    }).then(
      imageData => {
        this.imageSrc = this.webView.convertFileSrc(imageData);
        this.loadPhoto(imageData);
      },
      err => {
        console.log(err);
      }
    );
  }

  selectPhoto() {
    this.imagePicker.getPictures({
      maximumImagesCount: 1,
      quality: 100
    }).then(
      imageData => {        
        this.imageSrc = this.webView.convertFileSrc(imageData[0]);
        this.loadPhoto(imageData[0]);
      },
      err => {
        console.log(err);
      }
    );
  }

  private loadPhoto(imageFileUri: any) {
    this.file.resolveLocalFilesystemUrl(imageFileUri).then(entry => {
      entry['file'](file => {
        this.readFile(file);
      })
    })
  }

  private readFile(file: any) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], { type: file.type });
      this.bioForm.controls['image'].setValue(imgBlob);
    }

    reader.readAsArrayBuffer(file);
  }

  loadMap() {
    console.log(this.lat);
    console.log(this.lng);

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 18,
        tilt: 30
      }
    });

    let marker: Marker = this.map.addMarkerSync({
      title: 'Drag',
      draggable: true,
      position: {
        lat: this.lat,
        lng: this.lng
      },
      animation: GoogleMapsAnimation.DROP
    });

    marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe((e) => {
      this.lat = e[0].lat;
      this.lng = e[0].lng;

      this.bioForm.controls['lat'].setValue(e[0].lat);
      this.bioForm.controls['lng'].setValue(e[0].lng);
    });
    
  }

  randomString(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  

}
