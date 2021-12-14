const { v4: uuidv4 } = require('uuid');
const Ingredient = require('./ingredient');

module.exports = class FakeUsersSource {
  constructor(usersSource) {
    this.usersSource = usersSource;
  }

  async get(id) {
    const user = await this.usersSource.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async addUser() {
    const newId = uuidv4();
    this.usersSource.push({
      id: newId,
      pantry: [],
    });
    return this.get(newId);
  }

  async addIngredient(id, ingredient) {
    const user = await this.get(id);
    await user.pantry.push(new Ingredient(ingredient));
    return ingredient;
  }

  async amendIngredient(id, ingredient, amountUsed) {
    const user = await this.get(id);
    const pantryIngredient = await user.pantry.find(
      (i) => i.id === ingredient.id
    );

    const measurement = Object.keys(amountUsed)[0];
    const newQuantity = measurement
      ? pantryIngredient.quantity[measurement] - amountUsed[measurement]
      : 0;

    if (newQuantity <= 0) {
      this.removeIngredient(user, pantryIngredient);
      return;
    }
    pantryIngredient.quantity[measurement] = newQuantity;
    return pantryIngredient;
  }

  removeIngredient(user, ingredient) {
    user.pantry.splice(user.pantry.indexOf(ingredient), 1);
  }

  withIngredient(user, ingredient) {
    // use Ingredient class
  }

};
