import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
// import { AnimalComponent } from './animal/animal.component';
// import { PlantComponent } from './plant/plant.component';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.page.html',
  styleUrls: ['./bio.page.scss'],
})
export class BioPage {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  segmentChanged(event) {
    this.router.navigate([`/bio/${event.target.value}`]);
    // console.log(event.target.value)
  }

  // async presentModal(type) {
  //   let modal = await this.modalController.create({
  //     component: type == 1 ? PlantComponent : AnimalComponent,
  //     // componentProps: { value: 123 }
  //   });
  //   return await modal.present();
  // }

}
