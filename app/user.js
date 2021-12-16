const IngredientsSource = require('./fixtures/fakes/fakeIngredientsSource');

module.exports = class User {
  constructor(id) {
    this.pantry = new IngredientsSource();
    this.id = id;
  }

  addIngredient(ingredient) {
    this.pantry.addIngredient(ingredient);
  }

  amendIngredient(ingredient, amountUsed) {
    this.pantry.amendIngredient(ingredient, amountUsed);
  }
};
