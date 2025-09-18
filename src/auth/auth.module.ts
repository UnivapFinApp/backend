import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { EncryptionModule } from 'src/common/encryption/encryption.module';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [EncryptionModule, UserModule, ConfigModule,
    JwtModule.register({
      global: true,
      secret: (new ConfigService).get<string>("JWT_SECRET"),
      signOptions: { expiresIn: '24h' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }, AuthService, 
    JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}
