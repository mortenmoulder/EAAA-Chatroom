import { User } from "./User";
import { Room } from "./Room";

export class Message {
    _id: string;
    message: string;
    sentBy: User;
    room: Room;
    date: Date;
}