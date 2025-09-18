import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { UserRepository } from './domain/user.repository';
import { UserEntity } from './domain/user.entity';

@Injectable()
export class UserService implements UserRepository {
    constructor(private prisma: PrismaService) { }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput
    ): Promise<UserEntity> {
        const user = await this.prisma.user.findUnique({
            where: userWhereUniqueInput
        });

        if (user == null || !user) throw new NotFoundException('User not found');
        else return user!;
    }
    users(
        userWhereInput: Prisma.UserWhereInput
    ): Promise<UserEntity[]> {
        return this.prisma.user.findMany({
            where: userWhereInput
        });
    }

    async createUser(
        data: Prisma.UserCreateInput
    ): Promise<UserEntity> {
        const haveUser = await this.prisma.user.count({ where: { email: data.email } });
        if (!!haveUser) throw new ConflictException('User already exists'); 
        
        return this.prisma.user.create({ data });
    }

    async updateUser(
        where: Prisma.UserWhereUniqueInput,
        data: Prisma.UserUpdateInput
    ): Promise<UserEntity> {
        const haveUser = await this.user({ id: where.id });

        if (!haveUser) throw new NotFoundException('User not found');

        return this.prisma.user.update({ where, data });
    }

    deleteUser(where: any): Promise<UserEntity> {
        const haveUser = this.user({ id: where.id });
        if (!haveUser) throw new NotFoundException('User not found');


        return this.prisma.user.update({ data: { isActive: false }, where });
    }

    verifyUser(where: Prisma.UserWhereUniqueInput): Promise<number> {
        return this.prisma.user.count({ where });
    }
}
