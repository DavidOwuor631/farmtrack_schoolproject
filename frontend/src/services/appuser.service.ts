import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppuserService {
  private url = `${environment.apiurl}/api/auth/signup`; // Endpoint for signup

  constructor(private http: HttpClient) {}

  // Method to register a new user
  registerUser(userData: { name: string; email: string; password: string; role: string }) {
    return this.http.post(this.url, userData);
  }
}

