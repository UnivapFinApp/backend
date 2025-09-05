import { ApiProperty, ApiSchema } from "@nestjs/swagger"
import { z } from "zod";

export const registerUserSchema = z
    .object({
        name: z.string().min(3, { error: "Name should have at least 3 characters" }),
        email: z.email(),
        password: z.string().min(6, { error: "Password should have at least 6 characters" }),
    }).required();

@ApiSchema({ name: "RegisterUserModel" })
export class RegisterUserDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}

export class LoginResponseDto {
    @ApiProperty()
    token: string;
}