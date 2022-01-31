const config = require('config');
const faunadb = require('faunadb');
const dbClient = new faunadb.Client({ secret: config.get('faunaSecret') });

const RecipeSource = require('./sources/recipeSource');
const UserSource = require('./sources/userSource');

const UserService = require('./userService');
const RecipeService = require('./recipeService');

const IngredientsSource = require('./sources/ingredientsSource');
const IngredientsService = require('./ingredientsService');

const ingredientsSource = new IngredientsSource(dbClient);
const ingredientsService = new IngredientsService(ingredientsSource);

const userSource = new UserSource(dbClient, ingredientsService);
const recipeSource = new RecipeSource(dbClient, ingredientsService);

const userService = new UserService(userSource);
const recipeService = new RecipeService(recipeSource);

module.exports = {
  userService,
  recipeService,
  ingredientsService,
};
