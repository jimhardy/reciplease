const { expect } = require('chai');

const RecipesSource = require('../app/fixtures/fakeRecipesSource');

describe('Recipes Source', () => {
  it('should be add a recipe to the recipe source', () => {
    const recipesSource = new RecipesSource();
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

    console.log(recipesSource);

    expect(recipesSource.recipes).to.have.lengthOf(1);
  });
});
