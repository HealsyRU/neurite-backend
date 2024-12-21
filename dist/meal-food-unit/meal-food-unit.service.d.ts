import { PrismaService } from 'src/prisma.service';
import { UpdateFoodQuantityDto } from './dto/updateFoodQuantity.dto';
export declare class MealFoodUnitService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: string, userId: string, ccalNorm: number): Promise<{
        mealFoodUnit: {
            meal: {
                mealUnit: {
                    mealDay: {
                        body: {
                            ccalNorm: number;
                        };
                    };
                }[];
            };
            foodUnit: {
                nutrientSchema: {
                    id: string;
                    glycemicIndex: number;
                    glycemicLoad: number;
                    insulinIndex: number;
                    energy: number;
                    protein: number;
                    fat: number;
                    carb: number;
                    alcohol: number;
                    water: number;
                    fiber: number;
                    sugar: number;
                    sucrose: number;
                    glucose: number;
                    fructose: number;
                    lactose: number;
                    maltose: number;
                    galactose: number;
                    strach: number;
                    trans: number;
                    saturated: number;
                    mono: number;
                    poly: number;
                    omega3: number;
                    omega6: number;
                    bCar: number;
                    vitA: number;
                    vitC: number;
                    vitK: number;
                    vitE: number;
                    vitD: number;
                    vitB1: number;
                    vitB2: number;
                    vitB3: number;
                    vitB4: number;
                    vitB5: number;
                    vitB6: number;
                    vitB7: number;
                    vitB9: number;
                    vitB11: number;
                    vitB12: number;
                    q10: number;
                    vitN: number;
                    vitH: number;
                    creatine: number;
                    cholesterol: number;
                    teobromine: number;
                    lycopene: number;
                    caffeine: number;
                    ca: number;
                    ph: number;
                    mg: number;
                    fe: number;
                    zn: number;
                    i: number;
                    cu: number;
                    mn: number;
                    se: number;
                    si: number;
                    f: number;
                    k: number;
                    na: number;
                    cl: number;
                    cr: number;
                    co: number;
                    mo: number;
                    s: number;
                    tryptophan: number;
                    threonine: number;
                    isoleucine: number;
                    leucine: number;
                    lysine: number;
                    methionine: number;
                    phenylalanine: number;
                    valine: number;
                    histidine: number;
                    cysteine: number;
                    tyrosine: number;
                    arginine: number;
                    serine: number;
                    asparagine: number;
                    glutamine: number;
                    alanine: number;
                    glycine: number;
                    proline: number;
                };
                title: string;
                foodPortions: {
                    foodPortionCategory: {
                        title: string;
                    };
                    id: string;
                    quantity: number;
                    measure: string;
                }[];
                foodCategories: {
                    id: string;
                    title: string;
                }[];
            };
            portion: {
                foodPortionCategory: {
                    title: string;
                };
                id: string;
                quantity: number;
                measure: string;
            };
        } & {
            id: string;
            mealId: string;
            foodUnitId: string;
            portionId: string;
            multiplier: number;
            cost: number;
        };
        ccalNorm: number;
    }>;
    updateFoodQuantity(dto: UpdateFoodQuantityDto, userId: string, ccalNorm: number): Promise<{
        mealFoodUnit: {
            foodUnit: {
                nutrientSchema: {
                    id: string;
                    glycemicIndex: number;
                    glycemicLoad: number;
                    insulinIndex: number;
                    energy: number;
                    protein: number;
                    fat: number;
                    carb: number;
                    alcohol: number;
                    water: number;
                    fiber: number;
                    sugar: number;
                    sucrose: number;
                    glucose: number;
                    fructose: number;
                    lactose: number;
                    maltose: number;
                    galactose: number;
                    strach: number;
                    trans: number;
                    saturated: number;
                    mono: number;
                    poly: number;
                    omega3: number;
                    omega6: number;
                    bCar: number;
                    vitA: number;
                    vitC: number;
                    vitK: number;
                    vitE: number;
                    vitD: number;
                    vitB1: number;
                    vitB2: number;
                    vitB3: number;
                    vitB4: number;
                    vitB5: number;
                    vitB6: number;
                    vitB7: number;
                    vitB9: number;
                    vitB11: number;
                    vitB12: number;
                    q10: number;
                    vitN: number;
                    vitH: number;
                    creatine: number;
                    cholesterol: number;
                    teobromine: number;
                    lycopene: number;
                    caffeine: number;
                    ca: number;
                    ph: number;
                    mg: number;
                    fe: number;
                    zn: number;
                    i: number;
                    cu: number;
                    mn: number;
                    se: number;
                    si: number;
                    f: number;
                    k: number;
                    na: number;
                    cl: number;
                    cr: number;
                    co: number;
                    mo: number;
                    s: number;
                    tryptophan: number;
                    threonine: number;
                    isoleucine: number;
                    leucine: number;
                    lysine: number;
                    methionine: number;
                    phenylalanine: number;
                    valine: number;
                    histidine: number;
                    cysteine: number;
                    tyrosine: number;
                    arginine: number;
                    serine: number;
                    asparagine: number;
                    glutamine: number;
                    alanine: number;
                    glycine: number;
                    proline: number;
                };
                title: string;
                foodPortions: {
                    foodPortionCategory: {
                        title: string;
                    };
                    id: string;
                    quantity: number;
                    measure: string;
                }[];
                foodCategories: {
                    id: string;
                    title: string;
                }[];
            };
            portion: {
                foodPortionCategory: {
                    title: string;
                };
                quantity: number;
                measure: string;
            };
        } & {
            id: string;
            mealId: string;
            foodUnitId: string;
            portionId: string;
            multiplier: number;
            cost: number;
        };
        ccalNorm: number;
    }>;
}
