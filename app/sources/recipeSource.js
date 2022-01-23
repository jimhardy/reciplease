const config = require('config');
const Recipe = require('../recipe');
const Ingredient = require('../ingredient');
const faunadb = require('faunadb');
const { xit } = require('mocha');
const { Select } = require('faunadb');

const client = new faunadb.Client({ secret: config.get('faunaSecret') });

const q = faunadb.query;

module.exports = class RecipeSource {
  constructor() {}
  initializeRecipes() {}

  async getAllRecipes() {
    try {
      let x;
      const recipes = await client.query(
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
