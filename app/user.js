const IngredientsSource = require('./fixtures/fakes/fakeIngredientsSource');
const { userService } = require('./index');

module.exports = class User {
  constructor({ id, name, pantry }) {
    this.id = id;
    this.name = name;
    this.pantry = new IngredientsSource(pantry || []);
  }

  async addIngredient(ingredient) {
    return this.pantry.addIngredient(ingredient);
  }

  async addIngredients(ingredients) {
    return Promise.all(
      ingredients.map(async (ingredient) => {
        const response = await this.addIngredient(ingredient);
        return { name: ingredient.name, id: response };
      })
    );
  }

  amendIngredient(ingredient, amountUsed) {
    this.pantry.amendIngredient(ingredient, amountUsed);
  }
};
