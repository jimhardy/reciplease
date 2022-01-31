module.exports = class UserService {
  constructor(userSource) {
    this.userSource = userSource;
    this.healthy = true;
    console.log('UserService initialized');
  }

  async getUser(id) {
    return Promise.resolve(this.userSource.getUser(id));
  }

  async addUser() {
    return Promise.resolve(this.userSource.addUser());
  }

  async updateUserPantry(userId, ingredients) {
    const response = await this.userSource.updateUserPantry(userId, ingredients);
    return Promise.resolve(response);
  }
};
