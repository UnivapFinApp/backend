import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { EncryptionModule } from 'src/common/encryption/encryption.module';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [EncryptionModule, UserModule, ConfigModule,
    JwtModule.register({
      global: true,
      secret: (new ConfigService).get<string>("JWT_SECRET"),
      signOptions: { expiresIn: '24h' },
    })
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
