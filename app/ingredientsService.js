module.exports = class IngredientsService {
  constructor(ingredientsSource) {
    this.ingredientsSource = ingredientsSource;
    this.healthy = true;
    console.log('IngredientsService initialized');
  }

  async saveIngredients(ingredients, userId) {
    const response = await this.ingredientsSource.addIngredients(ingredients);
    return Promise.resolve(response);
  }

  async addIngredient(ingredient) {
    const response = await this.ingredientsSource.addIngredient(ingredients);
    return Promise.resolve(response);
  }

  async getIngredientIds(ingredients) {
    const response = await this.ingredientsSource.getIngredientIds(ingredients);
    return Promise.resolve(response);
  }
};
