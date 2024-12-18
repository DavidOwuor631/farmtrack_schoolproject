import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Adjust based on your setup
import { User } from '../app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${environment.apiurl}/api/profile`; // Adjust the URL if needed

  constructor(private http: HttpClient) {}

  // Fetch the user profile from the backend using the token
  getProfile(token: string): Observable<User> {
    return this.http.get<User>(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
