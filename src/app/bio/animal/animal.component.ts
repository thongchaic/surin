import { Component, OnInit, Input } from '@angular/core';
import { BioService } from '../shared/bio.service';
import { Platform, ToastController, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent implements OnInit {

  formType = 'ANIMAL';
  organs: any;
  
  constructor(
    private bioService: BioService,
    private toast: ToastController,
    private loading: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.bioService.getOrgans(2).subscribe(data => this.organs = data);
  }

  submit(form) {
    this.bioService.create(form, 2).subscribe(res => {

      this.presentLoading();

    }, err => {
      this.presentToast('นำเข้าข้อมูลไม่สำเร็จ กรุณาตรวจข้อมูลอีกครั้ง');
    });
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      position: 'top',
      duration: 1000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loading.create({
      message: '',
      duration: 2000,
      spinner: 'circles'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.navCtrl.navigateRoot('/home');
    this.presentToast('นำเข้าข้อมูลเรียบร้อยแล้ว');
  }

}
