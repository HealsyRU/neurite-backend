import { MealDayService } from './meal-day.service';
export declare class MealDayController {
    private readonly mealDayService;
    constructor(mealDayService: MealDayService);
    getMealDayDataByDate(bodyId: string, date: string): Promise<{
        mealDay: {
            body: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                bodyName: string;
                sex: number;
                birthDate: string;
                pal: string;
                ccalNorm: number;
                mainGoal: number;
                userId: string;
            };
            mealUnits: ({
                meal: {
                    mealFoodUnits: ({
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
                            foodCategories: {
                                id: string;
                                title: string;
                            }[];
                        } & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            authorId: string;
                            barcode: string;
                            title: string;
                            isPublic: boolean;
                            isVerified: boolean;
                            nutrientSchemaId: string;
                        };
                        portion: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            quantity: number;
                            measure: string;
                            foodPortionCategoryId: string;
                            foodUnitId: string;
                        };
                    } & {
                        id: string;
                        mealId: string;
                        foodUnitId: string;
                        portionId: string;
                        multiplier: number;
                        cost: number;
                    })[];
                } & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    authorId: string;
                    isPublic: boolean;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                time: string;
                target: number;
                mealId: string;
                mealDayId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            bodyId: string;
            date: string;
        };
    }>;
}
