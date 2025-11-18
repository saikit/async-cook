import { Router } from "express";
import { getAllRecipes, getRecipeBySlug } from "./handlers.js";

const appRouter = Router();

appRouter.get("/", getAllRecipes);
appRouter.get("/:slug", getRecipeBySlug);

export default appRouter;