import { CreatePortionCategoryDto } from './dto/create-portion.dto';
import { PrismaService } from 'src/prisma.service';
export declare class PortionService {
    private prisma;
    constructor(prisma: PrismaService);
    createPortionCategory(createPortionCategoryDto: CreatePortionCategoryDto): Promise<{
        portionCategory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            authorId: string;
            isSystem: boolean;
        };
    }>;
    getAllPortionCategories(): Promise<{
        portionCategories: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            authorId: string;
            isSystem: boolean;
        }[];
    }>;
}
