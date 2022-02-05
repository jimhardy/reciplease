const Recipe = require('../recipe');
const faunadb = require('faunadb');

const q = faunadb.query;

module.exports = class RecipeSource {
  constructor(dbClient, ingredientsService) {
    this.recipes = [];
    this.client = dbClient;
    this.ingredientsService = ingredientsService;
  }
  initializeRecipes() {}

  async getAllRecipes() {
    try {
      let x;
      const recipes = await this.client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('recipes'))),
          q.Lambda(
            'recipe',
            q.Let(
              {
                recipeDetails: q.Get(q.Var('recipe')),
                title: q.Select(['data', 'title'], q.Var('recipeDetails')),
                method: q.Select(['data', 'method'], q.Var('recipeDetails')),
                time: q.Select(['data', 'time'], q.Var('recipeDetails')),
                ingredients: q.Map(
                  q.Select(['data', 'ingredients'], q.Var('recipeDetails')),
                  q.Lambda(
                    'ingredient',
                    q.Let(
                      {
                        ingredientDetail: q.Get(q.Select(['ingredient'], q.Var('ingredient'))),
                      },
                      {
                        name: q.Select(['data', 'name'], q.Var('ingredientDetail')),
                        amount: q.Select(['amount'], q.Var('ingredient')),
                        measure: q.Select(['measure'], q.Var('ingredient')),
                      }
                    )
                  )
                ),
              },
              {
                title: q.Var('title'),
                method: q.Var('method'),
                time: q.Var('time'),
                ingredients: q.Var('ingredients'),
              }
            )
          )
        )
      );
      return Promise.all(recipes.data.map(async (recipe) => new Recipe(recipe)));
    } catch (error) {
      console.log(error);
    }
  }

  async addRecipe(recipe) {
    console.log(this.ingredientsService);
    try {
      const ingredients = this.ingredientsService.getIngredientIds(recipe.ingredients);
      const document = await this.client.query(
        q.Create(q.Collection('recipes'), {
          data: {
            title: recipe.title,
            ingredients: ingredients,
            method: recipe.method,
            time: recipe.time,
            imageUrl: recipe.imageUrl,
          },
        })
      );
      return document;
    } catch (error) {
      console.log(error);
    }
  }

  async getRecipeByIngredients(pantry) {
    const matchingRecipes = [];
    const partialRecipes = [];
    const recipes = await this.getAllRecipes();
    await Promise.all(
      recipes.map((recipe) => {
        const missingIngredients = [];
        recipe.ingredientsSource.ingredients.forEach((ingredient) => {
          if (
            !pantry.find(
              (pantryIngredient) =>
                pantryIngredient.name === ingredient.name &&
                pantryIngredient.measure === ingredient.measure &&
                pantryIngredient.amount >= ingredient.amount
            )
          ) {
            missingIngredients.push(ingredient);
          }
        });

        const score =
          (recipe.ingredientsSource.ingredients.length - missingIngredients.length) /
          recipe.ingredientsSource.ingredients.length;

        if (score === 1) {
          matchingRecipes.push(recipe);
        } else if (score > 0) {
          partialRecipes.push({ recipe, missingIngredients });
        }
      })
    );
    return { matchingRecipes, partialRecipes };
  }
};
