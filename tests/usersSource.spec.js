const { expect } = require('chai');
const UserSource = require('../app/userSource');
const UsersSource = require('../app/fakeUsersSource');
const userData = require('../app/fixtures/fakeUserData.json');

const userSource = new UserSource(new UsersSource(userData));

describe('usersSource', () => {

  it('should find a user given an id', async () => {
    const response = await userSource.getUser('user-uuid1234');
    expect(response).to.not.be.undefined;
    expect(response.id).to.equal('user-uuid1234');
    expect(response.pantry).to.be.a('array');
  });

  it('should create a user if none is found', async () => {
    const response = await userSource.getUser('not found');
    expect(response).to.not.be.undefined;
    expect(response.pantry).to.have.a.lengthOf(0);
  });

  it('should add an ingredient to a users pantry', async () => {
    await userSource.addIngredient('user-uuid1234', {
      id: 'uuid5',
      name: 'cayenne pepper',
      quantity: {
        grams: 50,
      },
      caloriesPer100Grams: 0,
      category: ['seasoning'],
    });
    const response = await userSource.getUser('user-uuid1234');
    expect(response.pantry).to.deep.include.members([
      {
        id: 'uuid5',
        name: 'cayenne pepper',
        quantity: {
          grams: 50,
        },
        caloriesPer100Grams: 0,
        category: ['seasoning'],
      },
    ]);
  });

  it('should amend the quantity of an ingredient', async () => {
    await userSource.amendIngredient(
      'user-uuid1234',
      {
        id: 'uuid1',
        name: 'salt',
      },
      { grams: 10 }
    );

    const response = await userSource.getUser('user-uuid1234');
    const ingredient = response.pantry.find((x) => x.id === 'uuid1');
    expect(ingredient.quantity.grams).to.equal(990);
  });

  it('should remove the ingredient if it is all used up', async () => {
    await userSource.amendIngredient(
      'user-uuid1234',
      {
        id: 'uuid2',
        name: 'pepper',
      },
      { grams: 200 }
    );

    const response = await userSource.getUser('user-uuid1234');
    const ingredient = response.pantry.find((x) => x.id === 'uuid2');
    expect(ingredient).to.be.undefined;
  });
});
