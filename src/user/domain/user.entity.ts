import { Exclude } from "class-transformer";

export class UserEntity {
    name: string;
    id: string;
    email: string;

    @Exclude()
    password: string;

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}