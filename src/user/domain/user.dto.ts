import { PartialType } from "@nestjs/swagger";

export class CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }