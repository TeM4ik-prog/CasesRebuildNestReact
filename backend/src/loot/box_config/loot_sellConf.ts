import { LootCategory } from "./box_loot";

const categoryCoefficients: { [key in keyof LootCategory]: number } = {
    common: 0.33,
    uncommon: 1.5,
    epic: 3,
    legendary: 8,
};

export async function ReturnSellCoefficientByCategoryId(categoryName: keyof LootCategory) {
    const coefficient = categoryCoefficients[categoryName];
  
    if (coefficient === undefined) {
      throw new Error(`Unknown category: ${categoryName}`);
    }
  
    return coefficient;
}


