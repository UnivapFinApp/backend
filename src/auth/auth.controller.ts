import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { UserEntity } from 'src/user/domain/user.entity';
import { LoginResponseDto, RegisterUserDto, registerUserSchema } from './domain/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/public.decorator';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/utils/zod.pipe';
import { LoginUserDto } from './domain/signin.dto';
import { JwtAuthGuard } from './auth.guard';


@Controller()
export class AuthController {
    constructor(
        private readonly service: AuthService
    ) { }

    @ApiOkResponse({
        description: 'Register a new user',
        type: UserEntity,
        isArray: true
    })
    @Public()
    @UsePipes(new ZodValidationPipe(registerUserSchema))
    @Post('register')
    async register(
        @Body()
        registerUser: RegisterUserDto,
    ): Promise<UserEntity> {
        return this.service.register(registerUser);
    }

    @Public()
    @ApiBody({ type: LoginUserDto })
    @Post('login')
    async login(
        @Body()
        loginUser: LoginUserDto
    ): Promise<LoginResponseDto> {
        return this.service.login(loginUser);
    }

    @Public()
    @Post('refresh-token')
    async refreshToken(@Body('refresh_token') refreshToken: string): Promise<{ access_token: string }> {
        return this.service.refreshAccessToken(refreshToken);
    } 

    @ApiBearerAuth("JWT")
    @Get('profile')
    profile(
        @Request() request
    ) {
        const req = request.user;
        return { name: req.name, email: req.email }
    }
}
