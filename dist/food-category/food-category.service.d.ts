import { PrismaService } from 'src/prisma.service';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
export declare class FoodCategoryService {
    private prisma;
    constructor(prisma: PrismaService);
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
