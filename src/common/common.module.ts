import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [DatabaseModule, EncryptionModule],
  exports: [EncryptionModule]
})
export class CommonModule { }
