import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EncryptionService } from 'src/common/encryption/encryption.service';
import { AuthRepository } from './domain/auth.repository';
import { UserService } from 'src/user/user.service';
import { LoginResponseDto, type RegisterUserDto } from './domain/auth.dto';
import { type UserEntity } from 'src/user/domain/user.entity';
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from './domain/signin.dto';

@Injectable()
export class AuthService implements AuthRepository {
    constructor(
        private readonly user: UserService,
        private readonly encrypt: EncryptionService,
        private readonly jwt: JwtService,
    ) { }

    async register(data: RegisterUserDto): Promise<UserEntity> {
        const hashPassword = await this.encrypt.hashPassword(data.password);
        return this.user.createUser({ ...data, password: hashPassword });
    }

    async signIn(
        data: LoginUserDto,
    ): Promise<LoginResponseDto> {
        const user = await this.user.user({ email: data.email });
        if (user == null) throw new UnauthorizedException();

        if (!(await this.validateUser(data.password, user.password))) { throw new UnauthorizedException() }

        const payload = { sub: user.id, name: user.name, email: user.email }
        const token = await this.jwt.signAsync(payload);

        return { token };
    }

    private validateUser(password: string, hashedPassword: string): Promise<boolean> {
        return this.encrypt.compare(password, hashedPassword);
    }
}
