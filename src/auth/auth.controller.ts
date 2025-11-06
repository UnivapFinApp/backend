import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { UserEntity } from 'src/user/domain/user.entity';
import {
  LoginControllerResponseDto,
  RegisterUserDto,
  registerUserSchema,
} from './domain/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/public.decorator';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/utils/zod.pipe';
import { LoginUserDto } from './domain/signin.dto';
import { type Request, type Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOkResponse({
    description: 'Register a new user',
    type: UserEntity,
    isArray: true,
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
    loginUser: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginControllerResponseDto> {
    const { access_token, refresh_token } = await this.service.login(loginUser);

    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return { access_token };
  }

  @ApiOkResponse({
    description: 'Logs the user out and clears the refresh token cookie',
  })
  @Public()
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response): { message: string } {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return { message: 'Logged out successfully' };
  }

  @Public()
  @Post('refresh-token')
  refreshToken(@Req() req: Request): Promise<{ access_token: string }> {
    const refreshToken = req.cookies['refreshToken'];

    return this.service.refreshAccessToken(refreshToken);
  }

  @ApiBearerAuth('JWT')
  @Get('profile')
  profile(@Req() request: Request) {
    const req = request.user as UserEntity;
    return { name: req.name, email: req.email };
  }
}
