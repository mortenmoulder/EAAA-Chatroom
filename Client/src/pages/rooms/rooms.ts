import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Location } from "@angular/common";

import { Storage } from '@ionic/storage';

import { ChatPage } from "../chat/chat";
import { LoginPage } from "../login/login";

import { User } from "../../models/User";
import { Room } from "../../models/Room";
import { RoomService } from "../../services/RoomService";

import { Socket } from 'ng-socket-io';

@IonicPage({
    name: "rooms-page"
})
@Component({
    selector: 'page-rooms',
    templateUrl: 'rooms.html'
})
export class RoomsPage {
    chatPage: any = ChatPage;
    rooms: Array<Room>;
    newRoom: Room;
    user: User;
    constructor(public navCtrl: NavController, private storage: Storage, private RoomService: RoomService, private socket: Socket, private location: Location) {
    }

    selectRoom(room: Room) {
        if (room.name) {
            this.navCtrl.push(this.chatPage);
            this.storage.set("room", room);
        }
    }

    createRoom() {
        if (this.newRoom.name) {
            this.newRoom.createdBy = this.user;
            this.RoomService.createRoom(this.newRoom).subscribe((room: Room) => {
                this.selectRoom(room);
            });
        }
    }

    back() {
        this.navCtrl.push(LoginPage);
    }

    ngOnInit() {
        this.newRoom = new Room();
        this.user = new User();
        this.storage.get("user").then((user: User) => {
            if (user) {
                this.user = user;
                this.RoomService.getRooms().subscribe((rooms: Array<Room>) => {
                    rooms = rooms.reverse();
                    this.rooms = rooms;
                });

                this.socket.on("newRoom", (room: Room) => {
                    this.rooms.unshift(room);
                });
            } else {
                this.navCtrl.push(LoginPage);
            }
        });

    }

    ionViewWillLeave() {
    }
}
