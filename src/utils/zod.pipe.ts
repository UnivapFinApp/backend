import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodType } from "zod";

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodType) { }

    transform(value: any, metadata: ArgumentMetadata) {
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        } catch (e) {
            const error = (JSON.parse(e))[0];
            throw new BadRequestException(`Validation failed: ${error.message}`);
        }
    }
}