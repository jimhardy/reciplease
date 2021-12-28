const { v4: uuidv4 } = require('uuid');

module.exports = class Ingredient {
  constructor({
    id,
    name,
    description,
    amount,
    measure,
    caloriesPerServing,
    categories,
    alternatives,
  }) {
    this.id = id || uuidv4();
    this.name = name || '';
    this.description = description || '';
    this.amount = amount || '';
    this.measure = measure || '';
    this.caloriesPerServing = caloriesPerServing;
    this.categories = categories || [];
    this.alternatives = alternatives || [];
  }

  amendQuantity({amount, measure}) {
    if (measure === this.measure) {
      const newQuantity = this.amount - amount;
      this.amount = newQuantity > 0 ? newQuantity : 0;
    } else {
      throw new Error('measures are not the same');
    }
    return this;
  }
};
