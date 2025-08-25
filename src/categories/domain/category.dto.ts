import { PartialType } from "@nestjs/swagger";

export class CreateCategoryDto {

}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }