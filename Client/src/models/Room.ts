import { User } from "./User";

export class Room {
    _id: string;
    name: string;
    createdBy: User;
    created: Date;
}