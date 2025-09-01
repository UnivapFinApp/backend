import { EncryptionService } from "src/common/encryption/encryption.service";
import { type UserEntity } from "src/user/domain/user.entity";
import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./domain/auth.dto";

@Injectable()
export class RegisterUserUseCase {
    constructor(
        private readonly service: AuthService,
        private readonly encrypt: EncryptionService,
    ) { }

    async doEncryption(password: string): Promise<string> {
        return await this.encrypt.hashPassword(password);
    }

    async execute(data: RegisterUserDto): Promise<UserEntity> {
        const hashedPassword = await this.doEncryption(data.password);
        const newData = { ...data, password: hashedPassword };

        return this.service.register(newData);
    }
}