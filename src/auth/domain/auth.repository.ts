import { CreateUserDto } from "src/user/domain/user.dto"
import { UserEntity } from "src/user/domain/user.entity"
import { LoginResponseDto, LoginUserDto } from "./auth.dto"

export interface AuthRepository {
    register(data: CreateUserDto): Promise<UserEntity>
    signIn(data: LoginUserDto): Promise<LoginResponseDto>
}