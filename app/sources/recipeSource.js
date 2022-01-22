const config = require('config');
const Recipe = require('../recipe');
const Ingredient = require('../ingredient');
const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: config.get('faunaSecret') });

const q = faunadb.query;

module.exports = class RecipeSource {
  constructor() {}
  initializeRecipes() {}

  async getAllRecipes() {
    try {
      const recipes = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('recipes'))),
          q.Lambda((x) => q.Get(x))
        )
      );
      const mappedRecipes = await Promise.all(
        recipes.data.map(async (recipe) => {
          const ingredents = await Promise.all(
            recipe.data.ingredients.map(async (entry) => {
              const document = await client.query(q.Get(entry.ingredient));
              return document.data;
            })
          );
          const result = new Recipe({ ...recipe.data, ingredients: ingredents });
          return result;
        })
      );

      return mappedRecipes;
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

          const document = await client.query(
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
      const document = await client.query(
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

  getRecipeByIngredients(pantry) {}
};
