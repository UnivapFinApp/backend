import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
    private readonly saltRounds = process.env.ROUNDS ?? 10;

    async hashPassword(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, this.saltRounds)
        return hash;
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
