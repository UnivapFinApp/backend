import { TransactionType } from "generated/prisma";
import { Decimal } from "generated/prisma/runtime/library";

export class TransactionEntity {
    description: string;
    type: TransactionType;
    amount: Decimal;
    date: Date

    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;


    constructor(partial: Partial<TransactionEntity>) {
        Object.assign(this, partial);
    }
}
