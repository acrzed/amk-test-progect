import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depart } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DepartsService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Depart[]> {
    return this.http.get<Depart[]>('api/departs');
  }

  getById(id: string): Observable<Depart> {
    return this.http.get<Depart>(`api/departs/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`api/departs/${id}`,
    );
  }

  create(name: string, desc?: string, img?: File | string | undefined) {
    const fd = new FormData();

    // if(img){
    //   fd.append('img', img, img?.name)
    // }

    return this.http.post<Depart>('api/departs', fd);
  }

  update(id: string, name: string, desc: string, img: File | string | undefined = '') {
    console.warn(id, name, desc, img);
    const fd = new FormData();
    fd.append('name', `${name}`);
    fd.append('desc', `${desc}`);
    if (img) {
      fd.append('image', img);
    }
    fd.forEach(e => console.warn(e));
    return this.http.patch<Depart>(`api/departs/${id}`, fd);
  }

  // update(id: string, name: string, desc: string, img: File | string | undefined = ''): Observable<Depart>{
  //   let myHeaders = new Headers();
  //   myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmVkMzk4M2ViZmQ4MjBjODYwNjFkMCIsInJvbGUiOlsiQURNSU4iXSwiZGVwdCI6eyJpbWciOiIiLCJfaWQiOiI2MTZhZDQ5Y2VkMWExOTFjYmNjN2M5ZmEiLCJuYW1lIjoiQWRtaW5zIiwiZGVzYyI6ItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQuNCy0L3Ri9C5INC-0YLQtNC10LsgLSDQv9C-0LvQvdGL0Lkg0LTQvtC_0YPRgdC6IiwiX192IjowfSwiaWF0IjoxNjQxMDMwMzYzLCJleHAiOjE2NDEwNzM1NjN9.0ihL4qu28AyzEBzoSC1pdoy3N065alciWQcApCTli8o");
  //   myHeaders.append("Content-Type", "application/json");
  //
  //   let raw = JSON.stringify({
  //     "name": `${name}`,
  //     "desc": `${desc}`,
  //     "img": `${img}`
  //   });
  //
  //   let requestOptions = {
  //     method: 'PATCH',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };
  //
  //   return this.http.patch<Depart>(`api/departs/${id}`, raw)
  // }
}
