import { FoodCategoryService } from './food-category.service';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
export declare class FoodCategoryController {
    private readonly foodCategoryService;
    constructor(foodCategoryService: FoodCategoryService);
    createFoodCategory(dto: CreateFoodCategoryDto): Promise<{
        foodCategory: {
            id: string;
            title: string;
        };
    }>;
    getAllFoodCategories(): Promise<{
        foodCategories: {
            id: string;
            title: string;
        }[];
    }>;
}
