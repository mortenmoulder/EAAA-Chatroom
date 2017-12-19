import { Room } from "../models/Room";
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class RoomService {
    constructor(
        private http: Http
    ) { }
    public createRoom(room: Room): Observable<Room> {
        return this.http.post(`http://localhost:8080/chat/room`, room).map(res => res.json());
    }

    public getRooms(): Observable<Array<Room>> {
        return this.http.get(`http://localhost:8080/chat/rooms`).map(res => res.json());
    }
}