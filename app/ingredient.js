const { v4: uuidv4 } = require('uuid');

module.exports = class Ingredient {
  constructor({
    id,
    name,
    description,
    quantity,
    caloriesPer100Grams,
    categories,
    alternatives,
  }) {
    this.id = id || uuidv4();
    this.name = name || '';
    this.description = description || '';
    this.quantity = quantity || {};
    this.caloriesPer100Grams = caloriesPer100Grams;
    this.categories = categories;
    this.alternatives = alternatives || [];
  }

  amendQuantity(amountUsed) {
    const measurement = Object.keys(amountUsed)[0];
    const newQuantity = measurement
      ? this.quantity[measurement] - amountUsed[measurement]
      : 0;
      
  }
};
