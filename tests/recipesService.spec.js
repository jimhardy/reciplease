const { expect } = require('chai');
const { v4: uuidv4 } = require('uuid');

const User = require('../app/user');
const UserService = require('../app/userService');
const UserSource = require('../app/fixtures/fakes/fakeUserSource');
const RecipeSource = require('../app/fixtures/fakes/fakeRecipeSource');
const RecipeService = require('../app/recipeService');

const fakeRecipeSource = new RecipeSource();
const recipeService = new RecipeService(fakeRecipeSource);
const userSource = new UserSource();
const userService = new UserService(userSource);

before(() => {
  const user = new User({ id: 'user-uuid1234' });
  user.addIngredient({
    id: uuidv4(),
    name: 'salt',
    amount: 1000,
    measure: 'grams',
  });
  user.addIngredient({
    id: uuidv4(),
    name: 'pepper',
    amount: 200,
    measure: 'grams',
  });
  user.addIngredient({
    id: uuidv4(),
    name: 'bread',
    amount: 10,
    measure: 'slices',
  });
  user.addIngredient({
    id: uuidv4(),
    name: 'butter',
    amount: 250,
    measure: 'grams',
  });

  userSource.withUser(user);
});

describe('Recipes Service', () => {
  it('should be add a recipe to the recipe source', () => {
    recipeService.addRecipe({
      title: 'butter on toast',
      ingredients: [
        {
          name: 'bread',
          amount: 2,
          measure: 'slices',
        },
        {
          name: 'butter',
          amount: 20,
          measure: 'grams',
        },
      ],
      method: 'bread in toaster, butter bread',
      time: { minutes: 5 },
    });

    expect(fakeRecipeSource.recipes).to.have.lengthOf(3);
  });

  it('should find matching recipes', async () => {
    const user = await userService.getUser('user-uuid1234');
    const foundRecipes = await recipeService.getRecipeByIngredients(user.pantry);
    expect(foundRecipes.matchingRecipes).to.have.lengthOf(1);
  });

  it('should find partially matching recipes', async () => {
    const user = await userService.getUser('user-uuid1234');
    const foundRecipes = await recipeService.getRecipeByIngredients(user.pantry);
    console.log({ foundRecipes });
    expect(foundRecipes.partialRecipes).to.have.lengthOf(2);
    expect(foundRecipes.partialRecipes[0]).to.haveOwnPropertyDescriptor('missingIngredients');
    expect(foundRecipes.partialRecipes[0].missingIngredients).to.have.lengthOf(1);
  });
});
