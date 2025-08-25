import { UserEntity as User } from "./user.entity";

export interface UserRepository {
    user(
        userWhereUniqueInput
    ): Promise<User | null>;

    users(
        userWhereInput
    ): Promise<User[]>;

    createUser(
        data
    ): Promise<User>;

    updateUser(
        where, data
    ): Promise<User>;

    deleteUser(
        where
    ): Promise<User>;
}