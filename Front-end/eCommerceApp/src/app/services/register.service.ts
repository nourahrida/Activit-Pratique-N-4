import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.module";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly url: string = 'http://localhost:3000/api/users/register';
  constructor(private httpClient: HttpClient) { }

  register(username: string, email: string, password: string) {
    const newUser = { email, username, password };
    return this.httpClient.post<any>(this.url, newUser);
  }
}
