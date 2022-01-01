import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
  getById(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
  getByDepart(departID:string): Observable<User[]> {
    return this.http.get<User[]>('api/users')
      .pipe(
        filter((e:User[], i) => {
          console.log(e, ' - ', i, ' - ',e[i].depart._id)
          return e[i].depart._id == '616af567f755900a93536739';
        })
      )

  }

  delete(user: User) {

  }
}
