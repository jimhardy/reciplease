const Recipe = require('../recipe');
const faunadb = require('faunadb');

const q = faunadb.query;

module.exports = class RecipeSource {
  constructor(dbClient, q) {
    this.recipes = [];
    this.client = dbClient;
    this.q = q;
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
    try {
      const ingredients = await Promise.all(
        recipe.ingredients.map(async (ingredient) => {
          const strippedIngredient = Object.assign({}, ingredient);
          delete strippedIngredient.amount;
          delete strippedIngredient.measure;

          const document = await this.client.query(
            q.Let(
              {
                ref: q.Match(q.Index('ingredient_by_name'), ingredient.name),
              },
              q.If(
                q.Exists(q.Var('ref')),
                q.Get(q.Var('ref')),
                q.Create(q.Collection('ingredients'), { data: strippedIngredient })
              )
            )
          );
          return { ingredient: document.ref, amount: ingredient.amount, measure: ingredient.measure };
        })
      );
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
        console.log({ matchingRecipes, partialRecipes });
      })
    );
    return { matchingRecipes, partialRecipes };
  }
};
