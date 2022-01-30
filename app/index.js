const config = require('config');
const faunadb = require('faunadb');
const dbClient = new faunadb.Client({ secret: config.get('faunaSecret') });

const RecipeSource = require('./sources/recipeSource');
const UserSource = require('./sources/userSource');

const UserService = require('./userService');
const RecipeService = require('./recipeService');

const userSource = new UserSource(dbClient);
const recipeSource = new RecipeSource(dbClient);
const userService = new UserService(userSource);
const recipeService = new RecipeService(recipeSource);

module.exports = {
  userService,
  recipeService,
};
