const UserService = require('./userService');
const UserSource = require('./fixtures/fakes/fakeUserSource');
const RecipeSource = require('./fixtures/fakes/fakeRecipeSource');
const RecipeService = require('./recipeService');

const userService = new UserService(new UserSource());
const recipeService = new RecipeService(new RecipeSource());

module.exports = {
  userService,
  recipeService,
};
