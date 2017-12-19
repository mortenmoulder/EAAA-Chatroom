import { Message } from "../models/Message";
import { Room } from "../models/Room";
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
    constructor(
        private http: Http
    ) { }
    public createMessage(message: Message): Observable<Message> {
        return this.http.post(`http://localhost:8080/chat/message`, message).map(res => res.json());
    }

    public getMessages(room: Room): Observable<Array<Message>> {
        let options = new RequestOptions({ params: room });
        return this.http.get(`http://localhost:8080/chat/messages`, options).map(res => res.json());
    }
}