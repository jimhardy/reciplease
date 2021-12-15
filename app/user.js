const IngredientsSource = require('../app/fakeIngredientsSource');

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
