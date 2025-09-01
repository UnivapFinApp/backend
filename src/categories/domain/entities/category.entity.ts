export class CategoryEntity {
    id: string
    name: string
    isActive: boolean;


    constructor(partial: Partial<CategoryEntity>) {
        Object.assign(this, partial);
    }
}
