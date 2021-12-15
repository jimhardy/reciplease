const IngredientsSource = require('./fixtures/fakeIngredientsSource');
const { v4: uuidv4 } = require('uuid');

module.exports = class Recipe {
  constructor({ title, ingredients, method, time, imageUrl }) {
    this.id = uuidv4();
    this.title = title || '';
    this.ingredients = this.addIngredients(ingredients);
    this.method = method || '';
    this.time = time || { minutes: 0 };
    this.imageUrl = imageUrl || '';
  }

  addIngredients(ingredients) {
    const ingredientsSource = new IngredientsSource();

    ingredients.forEach((ingredient) =>
      ingredientsSource.addIngredient(ingredient)
    );

    return ingredientsSource;
  }
};
