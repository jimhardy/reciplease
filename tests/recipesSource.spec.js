const { expect } = require('chai');
const { v4: uuidv4 } = require('uuid');

const RecipesSource = require('../app/fixtures/fakeRecipesSource');

const User = require('../app/user');
const UsersSource = require('../app/fixtures/fakeUsersSource');
const recipesSource = new RecipesSource();

const usersSource = new UsersSource();

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

  recipesSource.addRecipe({
    title: 'pasta and butter',
    ingredients: [
      {
        name: 'pasta',
        quantity: {
          grams: 500,
        },
      },
      {
        name: 'butter',
        quantity: {
          grams: 100,
        },
      },
    ],
    method: 'cook pasta, add butter',
    time: { minutes: 5 },
  });

  recipesSource.addRecipe({
    title: 'butter on brown toast',
    ingredients: [
      {
        name: 'brown bread',
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

  usersSource.withUser(user);
});

describe('Recipes Source', () => {
  it('should be add a recipe to the recipe source', () => {
    recipesSource.addRecipe({
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

    expect(recipesSource.recipes).to.have.lengthOf(3);
  });

  it('should find matching recipes', async () => {
    const user = await usersSource.getUser('user-uuid1234');
    const foundRecipes = recipesSource.getRecipeByIngredients(user.pantry);
    expect(foundRecipes.matchingRecipes).to.have.lengthOf(1);
    console.log(foundRecipes.partialRecipes);
    expect(foundRecipes.partialRecipes).to.have.lengthOf(2);
  });
});
