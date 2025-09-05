import { TransactionType } from "generated/prisma";
import { TransactionType as Type } from "../transaction-type.enum";
import { Decimal } from "generated/prisma/runtime/library";

export class TransactionEntity {
    description: string;
    type: TransactionType;
    amount: Decimal;
    date: Date

    userId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;


    constructor(partial: Partial<TransactionEntity>) {
        Object.assign(this, partial);
    }
}
