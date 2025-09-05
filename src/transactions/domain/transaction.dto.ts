import { ApiProperty, ApiSchema, PartialType } from '@nestjs/swagger';
import { TransactionType } from './transaction-type.enum';

@ApiSchema({ name: "CreateTransactionModel" })
export class CreateTransactionDto {
    @ApiProperty()
    description: string;
    @ApiProperty({ enum: TransactionType })
    type: TransactionType;
    @ApiProperty()
    amount: number;
    @ApiProperty()
    date: Date
    @ApiProperty()
    userId: string;
    @ApiProperty()
    categoryId: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty()
    isActive: boolean;
}

@ApiSchema({ name: "UpdateTransactionModel" })
export class UpdateTransactionDto extends PartialType(CreateTransactionDto) { }
