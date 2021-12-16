const { expect } = require('chai');
const { v4: uuidv4 } = require('uuid');

const RecipesService = require('../app/recipesService');

const User = require('../app/user');
const UsersService = require('../app/usersService');
const UserSource = require('../app/fixtures/fakes/fakeUserSource');

const RecipeSource = require('../app/fixtures/fakes/fakeRecipeSource');

const fakeRecipeSource = new RecipeSource();
const recipesService = new RecipesService(fakeRecipeSource);
const userSource = new UserSource();
const usersService = new UsersService(userSource);

before(() => {
  const user = new User('user-uuid1234');
  user.addIngredient({
    id: uuidv4(),
    name: 'salt',
    quantity: {
      grams: 1000,
    },
  });
  user.addIngredient({
    id: uuidv4(),
    name: 'pepper',
    quantity: {
      grams: 200,
    },
  });
  user.addIngredient({
    id: uuidv4(),
    name: 'bread',
    quantity: {
      slices: 10,
    },
  });
  user.addIngredient({
    id: uuidv4(),
    name: 'butter',
    quantity: {
      grams: 250,
    },
  });

  userSource.withUser(user);
});

describe('Recipes Service', () => {
  it('should be add a recipe to the recipe source', () => {
    recipesService.addRecipe({
      title: 'butter on toast',
      ingredients: [
        {
          name: 'bread',
          quantity: {
            slices: 2,
          },
        },
        {
          name: 'butter',
          quantity: {
            grams: 20,
          },
        },
      ],
      method: 'bread in toaster, butter bread',
      time: { minutes: 5 },
    });

    expect(recipesService.recipes).to.have.lengthOf(3);
  });

  it('should find matching recipes', async () => {
    const user = await usersService.getUser('user-uuid1234');
    const foundRecipes = recipesService.getRecipeByIngredients(user.pantry);
    expect(foundRecipes.matchingRecipes).to.have.lengthOf(1);
  });

  it('should find partially matching recipes', async () => {
    const user = await usersService.getUser('user-uuid1234');
    const foundRecipes = recipesService.getRecipeByIngredients(user.pantry);
    expect(foundRecipes.partialRecipes).to.have.lengthOf(2);
    expect(foundRecipes.partialRecipes[0]).to.haveOwnPropertyDescriptor('missingIngredients');
    expect(foundRecipes.partialRecipes[0].missingIngredients).to.have.lengthOf(1);
  });
});
