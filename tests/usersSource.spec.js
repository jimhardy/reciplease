const { expect } = require('chai');
const User = require('../app/user');
const UserService = require('../app/userService');
const UserSource = require('../app/fixtures/fakes/fakeUserSource');

const userSource = new UserSource();

const userService = new UserService(userSource);

before(() => {
  const user = new User('user-uuid2345');
  user.addIngredient({
    id: 'uuid1',
    name: 'salt',
    amount: 1000,
    measure: 'grams',
  });
  user.addIngredient({
    id: 'uuid2',
    name: 'pepper',
    amount: 200,
    measure: 'grams',
  });

  userSource.withUser(user);
});

describe('Users Source', () => {
  it('should find a user given an id', async () => {
    const user = await userService.getUser('user-uuid2345');
    expect(user).to.not.be.undefined;
    expect(user.id).to.equal('user-uuid2345');
    expect(user.pantry.ingredients).to.be.a('array');
  });

  it('should create a user if none is found', async () => {
    const user = await userService.getUser('not found');
    expect(user).to.not.be.undefined;
    expect(user.pantry.ingredients).to.have.a.lengthOf(0);
  });

  describe('User Ingredients', () => {
    it('should get all ingredients for a user', async () => {
      const user = await userService.getUser('user-uuid2345');
      const ingredients = user.pantry.getAllIngredients();
      expect(ingredients).to.have.lengthOf(2);
    });

    it('should add an ingredient to a users pantry', async () => {
      const user = await userService.getUser('user-uuid2345');
      await user.addIngredient({
        id: 'uuid5',
        name: 'cayenne pepper',
        amount: 50,
        measure: 'grams',
        caloriesPerServing: 0,
        categories: ['seasoning'],
      });
      expect(user.pantry.ingredients).to.deep.include.members([
        {
          id: 'uuid5',
          name: 'cayenne pepper',
          description: '',
          amount: 50,
          measure: 'grams',
          caloriesPerServing: 0,
          categories: ['seasoning'],
          alternatives: [],
        },
      ]);
      const ingredients = user.pantry.getAllIngredients();
      expect(ingredients).to.have.lengthOf(3);
    });

    it('should amend the quantity of an ingredient', () => {
      const user = userService.getUser('user-uuid2345');
      user.amendIngredient(
        {
          id: 'uuid1',
          name: 'salt',
        },
        { amount: 10, measure: 'grams' }
      );

      const ingredient = user.pantry.getIngredient('salt');
      expect(ingredient.amount).to.equal(990);
      expect(ingredient.measure).to.equal('grams');
    });

    it('should remove the ingredient if it is all used up', async () => {
      const user = userService.getUser('user-uuid2345');
      await user.amendIngredient(
        {
          id: 'uuid2',
          name: 'pepper',
        },
        { amount: 200, measure: 'grams' }
      );
      const ingredient = user.pantry.getIngredient('pepper');
      expect(ingredient).to.be.undefined;
    });
  });
});
