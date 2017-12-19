import { User } from "../models/User";
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    constructor(
        private http: Http
    ) { }
    public createUser(user: User): Observable<User> {
        let actualUser = new User();
        actualUser.username = user.username;
        return this.http.post(`http://localhost:8080/user/create`, actualUser).map(res => res.json());
    }
}