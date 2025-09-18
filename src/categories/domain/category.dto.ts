import { ApiProperty, ApiSchema, PartialType } from "@nestjs/swagger";

@ApiSchema({ name: "CreateCategoryModel" })
export class CreateCategoryDto {
    @ApiProperty({})
    name: string;
    @ApiProperty({})
    isActive: boolean;
    @ApiProperty({})
    userId: string;
}

@ApiSchema({ name: "UpdateCategoryModel" })
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }