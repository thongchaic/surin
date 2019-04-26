import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BioService {

  constructor(
    private http: HttpClient
  ) { }

  create(data, type) {
    return this.http.post(`${environment.api_url}/bio?diversity_group=${type}`, this.createFormData(data));
  }

  getOrgans(diversity) {
    return this.http.get(`${environment.api_url}/ref/${diversity === 1 ? 'plant_organs' : 'animal_organs'}`);
  }

  createFormData(data): FormData {
    const fd = new FormData();

    if(data.image) fd.append('image', data.image);
    fd.append('name', data.name);
    fd.append('organs', data.organs);
    fd.append('lat', data.lat);
    fd.append('lng', data.lng);
    fd.append('informant', data.informant);

    return fd;
  }
}
