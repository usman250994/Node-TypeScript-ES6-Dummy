import Pricing from "./model";

export const getAllPriceCategories = async () => {
    const result = await Pricing.find();
    return result;
};
