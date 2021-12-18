const { expect } = require('chai');
const User = require('../app/user');
const UserService = require('../app/userService');
const UserSource = require('../app/fixtures/fakes/fakeUserSource');

const userSource = new UserSource();

const userService = new UserService(userSource);

before(() => {
  const user = new User('user-uuid1234');
  user.addIngredient({
    id: 'uuid1',
    name: 'salt',
    quantity: {
      grams: 1000,
    },
  });
  user.addIngredient({
    id: 'uuid2',
    name: 'pepper',
    quantity: {
      grams: 200,
    },
  });

  userSource.withUser(user);
});

describe('Users Source', () => {
  it('should find a user given an id', async () => {
    const user = await userService.getUser('user-uuid1234');
    expect(user).to.not.be.undefined;
    expect(user.id).to.equal('user-uuid1234');
    expect(user.pantry.ingredients).to.be.a('array');
  });

  it('should create a user if none is found', async () => {
    const user = await userService.getUser('not found');
    expect(user).to.not.be.undefined;
    expect(user.pantry.ingredients).to.have.a.lengthOf(0);
  });

  describe('User Ingredients', () => {

    it('should get all ingredients for a user' , async () => {
      const user = await userService.getUser('user-uuid1234');
      const ingredients = user.pantry.getAllIngredients();
      expect(ingredients).to.have.lengthOf(2);
    })

    it('should add an ingredient to a users pantry', async () => {
      const user = await userService.getUser('user-uuid1234');
      await user.addIngredient({
        id: 'uuid5',
        name: 'cayenne pepper',
        quantity: {
          grams: 50,
        },
        caloriesPer100Grams: 0,
        categories: ['seasoning'],
      });
      expect(user.pantry.ingredients).to.deep.include.members([
        {
          id: 'uuid5',
          name: 'cayenne pepper',
          description: '',
          quantity: {
            grams: 50,
          },
          caloriesPer100Grams: 0,
          categories: ['seasoning'],
          alternatives: [],
        },
      ]);
      const ingredients = user.pantry.getAllIngredients();
      expect(ingredients).to.have.lengthOf(3);
    });

    it('should amend the quantity of an ingredient', () => {
      const user = userService.getUser('user-uuid1234');
      user.amendIngredient(
        {
          id: 'uuid1',
          name: 'salt',
        },
        { grams: 10 }
      );

      const ingredient = user.pantry.getIngredient('salt');
      expect(ingredient.quantity.grams).to.equal(990);
    });

    it('should remove the ingredient if it is all used up', async () => {
      const user = userService.getUser('user-uuid1234');
      await user.amendIngredient(
        {
          id: 'uuid2',
          name: 'pepper',
        },
        { grams: 200 }
      );
      const ingredient = user.pantry.getIngredient('pepper');
      expect(ingredient).to.be.undefined;
    });
  });
});
