import { CategoryEntity as Category } from "./entities/category.entity";

export interface CategoryRepository {
    category(
        categoryWhereUniqueInput
    ): Promise<Category | null>;

    categories(
        categoryWhereInput
    ): Promise<Category[]>;

    createCategory(
        data
    ): Promise<Category>;

    updateCategory(
        categoryWhereUniqueInput, data
    ): Promise<Category>;

    deleteCategory(
        categoryWhereUniqueInput
    ): Promise<Category>
}