import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss'],
})
export class PlantComponent implements OnInit {
  @Input() value;
  
  formType = 'PLANT';
  
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

}
