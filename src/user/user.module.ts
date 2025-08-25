import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { EncryptionModule } from 'src/common/encryption/encryption.module';
import { EncryptionService } from 'src/common/encryption/encryption.service';

@Module({
    imports: [DatabaseModule, EncryptionModule],
    providers: [UserService, EncryptionService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }
