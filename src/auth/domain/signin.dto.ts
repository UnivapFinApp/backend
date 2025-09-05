import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ name: "LoginUserModel" })
export class LoginUserDto {
    @ApiProperty({})
    email: string;
    @ApiProperty()
    password: string;
}