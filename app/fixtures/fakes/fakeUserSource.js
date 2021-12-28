const { v4: uuidv4 } = require('uuid');
const userStore = require('../users.json');
const User = require('../../user');

// todo: add irl implementation with clouddb

module.exports = class UserSource {
  constructor() {
    this.userSource = [];
    this.initializeUsers();
  }

  initializeUsers() {
    userStore.users.forEach((user) => this.withUser(user.id, user.ingredients));
  }

  getUser(id) {
    const user = this.userSource.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      return this.addUser();
    }
  }

  addUser() {
    const newId = uuidv4();
    this.userSource.push(new User(newId));
    return this.getUser(newId);
  }

  withUser(user, ingredients) {
    const newUser = new User(user);
    if (ingredients) {
      ingredients.forEach((ingredient) => {
        newUser.addIngredient(ingredient);
      });
    }
    this.userSource.push(newUser);
    return this;
  }
};
