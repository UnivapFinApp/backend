import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { UserEntity } from 'src/user/domain/user.entity';
import { LoginResponseDto, RegisterUserDto, registerUserSchema } from './domain/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/utils/public.decorator';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/utils/zod.pipe';
import { LoginUserDto } from './domain/signin.dto';

@Controller()
export class AuthController {
    constructor(
        private readonly service: AuthService
    ) { }

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
        return this.service.signIn(loginUser);
    }


    @Get('profile')
    @UseGuards(AuthGuard)
    profile(
        @Request() request
    ) {
        const req = request.data;
        return { name: req.name, email: req.email }
    }

}
