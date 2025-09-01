import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { type UpdateUserDto } from './domain/user.dto';
import { UserEntity } from './domain/user.entity';

/**
 * Controlador utilizado para lidar com dados relacionados
 * ao usuário.
 * ### Observação
 * > Utilização de 
 * > `return new UserEntity()`
 * > para a exclusão do campo de password.
 */

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
    constructor(
        private readonly service: UserService,
    ) { }

    @Get('/:id')
    async get(@Param('id') id: string): Promise<UserEntity | null> {
        const user = await this.service.user({ id });

        return new UserEntity(user!) ?? null
    }

    @Get()
    async getAll(): Promise<UserEntity[]> {
        const users = await this.service.users({
            isActive: true
        });

        return users.map((user) => new UserEntity(user));
    }

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() data: UpdateUserDto,
    ): Promise<UserEntity> {
        const newUser = await this.service.updateUser({
            id
        }, data);
        return new UserEntity(newUser);
    }

    @Delete('/:id')
    async delete(
        @Param('id') id: string,
    ): Promise<UserEntity> {
        const deleted = await this.service.deleteUser({
            id
        });

        return new UserEntity(deleted);
    }
}
