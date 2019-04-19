import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  GoogleMaps,
  GoogleMap,
  Marker,
  GoogleMapsEvent
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input('formType') formType;
  @Output() submitChange = new EventEmitter();

  map: GoogleMap;
  lat: number = 0.00;
  lng: number = 0.00;

  bioForm: FormGroup = this.formBuilder.group({
    plant_name: [''],
    plant_organs: [''],
    informant: [''],
    lat: [],
    lng: [],
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
  ) {
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then(res => {
        // console.log('lat: '+res.coords.latitude);
        // console.log('lng: '+res.coords.longitude);
        this.lat = res.coords.latitude;
        this.lng = res.coords.longitude;

        this.bioForm.controls['lat'].setValue(res.coords.latitude);
        this.bioForm.controls['lng'].setValue(res.coords.longitude);

        this.loadMap(res.coords.latitude, res.coords.longitude);
      })
    })
  }

  ionViewDidLoad() {
    this.formType == 'PLANT' ? this.typeTitle = 'พืช' : this.typeTitle = 'สัตว์';
    console.log(this.formType);
  }

  submit() {
    this.loadPhoto(this.bioForm.controls['image'].value);
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      // cameraDirection: this.camera.Direction.FRONT,
      // mediaType: this.camera.MediaType.PICTURE
    }).then(
      imageData => {
        this.imageSrc = this.webView.convertFileSrc(imageData);
        // this.loadPhoto(imageData);
        this.bioForm.controls['image'].setValue(imageData);
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
        // this.loadPhoto(imageData[0]);
        this.bioForm.controls['image'].setValue(imageData[0]);
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
      const formData = new FormData;
      const imgBlob = new Blob([reader.result], { type: file.type });

      formData.append('image', imgBlob, file.name);
      formData.append('plant_name', this.bioForm.get('plant_name').value);
      formData.append('plant_organs', this.bioForm.get('plant_organs').value);
      formData.append('informant', this.bioForm.get('informant').value);
      formData.append('lat', this.bioForm.get('lat').value);
      formData.append('lng', this.bioForm.get('lng').value);

      this.postData(formData);
    }

    reader.readAsArrayBuffer(file);
  }

  private postData(formData) {
    // console.log(formData.get('plant_name'));
    // console.log(formData.get('plant_organs'));
    // console.log(formData.get('informant'));
    // console.log(formData.get('file'));
  }

  loadMap(lat, lng) {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: lat,
          lng: lng
        },
        zoom: 18,
        tilt: 30
      }
    });

    let marker: Marker = this.map.addMarkerSync({
      title: 'Drag',
      icon: 'blue',
      animation: 'DROP',
      draggable: true,
      position: {
        lat: lat,
        lng: lng
      }
    });

    marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe((e) => {
      // console.log(e[0]);
      this.lat = e[0].lat;
      this.lng = e[0].lng;

      this.bioForm.controls['lat'].setValue(e[0].lat);
      this.bioForm.controls['lng'].setValue(e[0].lng);
    });;
  }

  randomString(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  

}
