import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

import { Storage } from '@ionic/storage';

import { MessageService } from "../../services/MessageService";
import { Message } from "../../models/Message";
import { Room } from "../../models/Room";
import { User } from "../../models/User";

import { RoomsPage } from '../rooms/rooms';

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage {
    selectedRoom: Room;
    messages: Array<Message>;
    myMessage: Message;
    user: User;
    users: Array<User>;

    constructor(public navCtrl: NavController, public navParams: NavParams, private MessageService: MessageService, private Storage: Storage, private socket: Socket) {
    }

    newMessage() {
        this.myMessage.room = this.selectedRoom;
        this.myMessage.sentBy = this.user;

        this.MessageService.createMessage(this.myMessage).subscribe((message: Message) => {
            this.myMessage.message = "";
        });
    }

    back() {
        this.navCtrl.push(RoomsPage);
    }

    ngOnInit() {
        this.selectedRoom = new Room();
        this.myMessage = new Message();
        this.user = new User();
        this.users = new Array<User>();
    }

    ionViewDidLoad() {
        this.Storage.get("user").then((user: User) => {
            if (user) {
                this.user = user;
                this.Storage.get("room").then((room: Room) => {
                    if (room) {
                        this.selectedRoom = room;
                        this.MessageService.getMessages(this.selectedRoom).subscribe((messages: Array<Message>) => {
                            this.messages = messages;
                        });

                        this.socket.emit("setRoom", {
                            roomId: room._id,
                            _id: this.user._id
                        });
                        this.socket.on("newMessage", (message: Message) => {
                            this.messages.push(message);
                        });
                        this.socket.on("users", (users: Array<User>) => {
                            this.users = [];
                            users.forEach((user: User) => {
                                this.users.push(user);
                            });
                        });
                        this.socket.on("userLeft", (userId: string) => {
                            this.users = this.users.filter(x => x._id != userId);
                        });
                    } else {
                        this.navCtrl.push(RoomsPage);
                    }
                });
            } else {
                this.navCtrl.push(RoomsPage);
            }
        });
    }

    ionViewWillLeave() {
        console.log("Person left");
        this.socket.emit("leaveRoom", {
            userId: this.user._id,
            roomId: this.selectedRoom._id
        });
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander(event) {
        console.log("Person left");
        this.socket.emit("leaveRoom", {
            userId: this.user._id,
            roomId: this.selectedRoom._id
        });
    }
}
