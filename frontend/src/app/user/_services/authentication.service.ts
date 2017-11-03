import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login(username: string, password: string) {
    return this.http.post('/api/authenticate', { username: username, password: password })
      .map((response: Response) => {
        // Login succesful if there is a jwt token in the response
        const user = response.json();
        if (user && user._id) {
          // Store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
