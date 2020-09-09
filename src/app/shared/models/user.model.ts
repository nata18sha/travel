import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
    constructor(public id: string,
                public userEmail: string,
                public userFirstName: string,
                public userLastName: string,
                public role: string,
                public image?: string,
                public phone?: string
    ) {}
}