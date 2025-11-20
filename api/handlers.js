import { find, findBySlug } from "./queries.js";

export const getAllRecipes = async (req, res) => {
    try {
    const recipes = await find();
    return res.status(200).json({recipes});
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export const getRecipeBySlug = async (req, res) => {
    const slug = req.params.slug;
    try {
    const recipe = await findBySlug(slug);
    return res.status(200).json({recipe});
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}