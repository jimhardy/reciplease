const IngredientsSource = require('./fixtures/fakes/fakeIngredientsSource');

module.exports = class User {
  constructor({ id, name, pantry }) {
    this.id = id;
    this.name = name;
    this.pantry = new IngredientsSource(pantry || []);
  }

  addIngredient(ingredient) {
    this.pantry.addIngredient(ingredient);
  }

  amendIngredient(ingredient, amountUsed) {
    this.pantry.amendIngredient(ingredient, amountUsed);
  }
};
