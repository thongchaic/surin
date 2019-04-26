import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bio',
  templateUrl: './bio.page.html',
  styleUrls: ['./bio.page.scss'],
})
export class BioPage {

  constructor(
    private router: Router,
  ) { }

  segmentChanged(event) {
    this.router.navigate([`/bio/${event.target.value}`]);
  }

}
