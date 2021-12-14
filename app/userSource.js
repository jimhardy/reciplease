
module.exports = class UserSource {
  constructor(usersSource) {
    this.usersSource = usersSource;
    this.user = {};
  }

  async getUser(id) {
    const user = await this.usersSource.get(id);
    if (user) {
      this.user = user;
    } else {
      const newUser = await this.usersSource.addUser()
      this.user = newUser;
    }
    return this.user;
  }

  async addIngredient(id, ingredient) {
    await this.usersSource.addIngredient(id, ingredient);
  }

  async amendIngredient(id, ingredient, amountUsed) {
    await this.usersSource.amendIngredient(id, ingredient, amountUsed);
  }
};
