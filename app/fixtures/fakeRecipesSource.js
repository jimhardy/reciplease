const Recipe = require('../recipe');

module.exports = class RecipesSource {
  constructor() {
    this.recipes = [];
  }

  addRecipe(recipe) {
    this.recipes.push(
      new Recipe({
        title: recipe.title,
        ingredients: recipe.ingredients,
        method: recipe.method,
        time: recipe.time,
        imageUrl: recipe.imageUrl,
      })
    );
  }

  


  getRecipeByIngredients(ingredients) {
    // todo: fuzzy match against recipe ingredients
    //! This is the hard bit
    console.log(ingredients);
    return;
  }
};
