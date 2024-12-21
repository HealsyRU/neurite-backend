import { PortionService } from './portion.service';
import { CreatePortionCategoryDto } from './dto/create-portion.dto';
export declare class PortionController {
    private readonly portionService;
    constructor(portionService: PortionService);
    create(createPortionDto: CreatePortionCategoryDto): Promise<{
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
