import { CreateUserDto } from "src/user/domain/user.dto"
import { UserEntity } from "src/user/domain/user.entity"
import { LoginResponseDto } from "./auth.dto"
import { LoginUserDto } from "./signin.dto"

export interface AuthRepository {
    register(data: CreateUserDto): Promise<UserEntity>
    login(data: LoginUserDto): Promise<LoginResponseDto>
}