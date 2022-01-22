const { v4: uuidv4 } = require('uuid');

module.exports = class Ingredient {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.name = data.name || '';
    this.description = data.description || '';
    this.amount = data.amount || '';
    this.measure = data.measure || '';
    this.caloriesPerServing = data.caloriesPerServing;
    this.categories = data.categories || [];
    this.alternatives = data.alternatives || [];
  }

  amendQuantity({ amount, measure }) {
    if (measure === this.measure) {
      const newQuantity = this.amount - amount;
      this.amount = newQuantity > 0 ? newQuantity : 0;
    } else {
      throw new Error('measures are not the same');
    }
    return this;
  }
};
