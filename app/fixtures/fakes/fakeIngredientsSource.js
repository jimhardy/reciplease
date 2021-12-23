const Ingredient = require('../../ingredient');

// todo: add irl implementation with clouddb
module.exports = class IngredientsSource {
  constructor() {
    this.ingredients = [];
  }

  getAllIngredients() {
    return this.ingredients;
  }

  getIngredient(name) {
    return this.ingredients.find((ingredient) => ingredient.name === name);
  }

  addIngredient(ingredient) {
    this.ingredients.push(new Ingredient(ingredient));
    return this;
  }

  amendIngredient(ingredientToAmend, amountUsed) {
    const ingredient = this.getIngredient(ingredientToAmend.name);
    ingredient.amendQuantity({ amount: amountUsed.amount, measure: amountUsed.measure });

    if (ingredient.amount <= 0) {
      this.removeIngredient(ingredient);
    }
    return this;
  }

  removeIngredient(ingredient) {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
    return this;
  }

  withIngredient(ingredient) {
    this.ingredients.push(new Ingredient(ingredient));
    return this;
  }
};
