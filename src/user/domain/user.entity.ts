import { Exclude } from "class-transformer";

export class UserEntity {
    id: string;
    name: string;
    email: string;

    @Exclude()
    password: string;

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    refreshToken: string | null;


    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}