import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { BioPage } from './bio.page';
import { AnimalComponent } from './animal/animal.component';
import { PlantComponent } from './plant/plant.component';
import { FormComponent } from './form/form.component';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { File } from '@ionic-native/file/ngx';

import { BioService } from './shared/bio.service';


const routes: Routes = [
  {
    path: '',
    component: BioPage,
    children: [
      {
        path: 'plant',
        component: PlantComponent,
        data: { title: 'พืช' }
      },
      {
        path: 'animal',
        component: AnimalComponent,
        data: { title: 'สัตว์' }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    PlantComponent,
    AnimalComponent,
  ],
  declarations: [
    BioPage,
    PlantComponent,
    AnimalComponent,
    FormComponent
  ],
  providers: [
    BioService,
    Camera,
    ImagePicker,
    FileTransfer,
    WebView,
    Geolocation,
    File
  ]
})
export class BioPageModule {}
