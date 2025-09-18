import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EncryptionService } from 'src/common/encryption/encryption.service';
import { AuthRepository } from './domain/auth.repository';
import { UserService } from 'src/user/user.service';
import { LoginResponseDto, type RegisterUserDto } from './domain/auth.dto';
import { UserEntity } from 'src/user/domain/user.entity';
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
        const user = await this.user.createUser({ ...data, password: hashPassword, refreshToken: null });
        return user;
    }

    async login(
        data: LoginUserDto,
    ): Promise<LoginResponseDto> {
        const user = await this.validateUser(data);
        
        if (user == null) { throw new UnauthorizedException() }

        const payload = { sub: user.id, name: user.name, email: user.email }

        return { access_token: await this.jwt.signAsync(payload), 
            refresh_token: await this.createRefreshToken(user)
        };
    }

    async refreshAccessToken(refreshToken: string): Promise<{ access_token: string }> {
        try {
            const decoded = this.jwt.verify(refreshToken);
            const user = await this.user.user({ refreshToken: refreshToken });

            if(!user) throw new UnauthorizedException();

            const payload = { sub: user.id, name: user.name, email: user.email }
            return { access_token: await this.jwt.signAsync(payload) };
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token', {cause: error});
        }
    }

    private async createRefreshToken(user: UserEntity): Promise<string> {
        const refreshToken = this.jwt.sign({}, {
            expiresIn: '7d',
            secret: process.env.JWT_REFRESH_SECRET,
        });

        user.refreshToken = refreshToken;
        await this.user.updateUser({ id: user.id }, { ...user, refreshToken});
        return refreshToken;
    }

    private async validateUser(data: LoginUserDto): Promise<UserEntity | null> {
        const user = await this.user.user({ email: data.email });
        if(user && await this.encrypt.compare(data.password, user.password)) {
            return new UserEntity(user);
        };

        return null;
    }
}
