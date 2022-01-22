const config = require('config');
const Recipe = require('../recipe')
const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: config.get('faunaSecret') });

const q = faunadb.query;

module.exports = class RecipeSource {
  constructor() {}
  initializeRecipes() {}

  async getAllRecipes() {
    console.log('here');

    try {
      const recipes = await client.query(q.Map(
        q.Paginate(q.Documents(q.Collection('recipes'))),
        q.Lambda(x => q.Get(x))
      ));
      const mappedRecipes = await recipes.data.map(recipe => new Recipe(recipe.data))
      console.log(mappedRecipes);
      return mappedRecipes;
    } catch (error) {
      console.log(error);
    }
  }

  addRecipe(recipe) {}

  getRecipeByIngredients(pantry) {}
};
