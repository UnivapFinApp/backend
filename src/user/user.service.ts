import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { UserRepository } from './domain/user.repository';
import { UserEntity } from './domain/user.entity';

@Injectable()
export class UserService implements UserRepository {
    constructor(private prisma: PrismaService) { }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput
    ): Promise<UserEntity | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput
        });
    }
    users(
        userWhereInput: Prisma.UserWhereInput
    ): Promise<UserEntity[]> {
        return this.prisma.user.findMany({
            where: userWhereInput
        });
    }

    createUser(
        data: Prisma.UserCreateInput
    ): Promise<UserEntity> {
        return this.prisma.user.create({ data });
    }

    updateUser(
        where: Prisma.UserWhereUniqueInput,
        data: Prisma.UserUpdateInput
    ): Promise<UserEntity> {
        return this.prisma.user.update({ where, data });
    }

    deleteUser(where: any): Promise<UserEntity> {
        return this.prisma.user.update({ data: { isActive: false }, where });
    }
}
