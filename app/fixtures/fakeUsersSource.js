const { v4: uuidv4 } = require('uuid');
const User = require('../user');

// todo: add irl implementation with clouddb

module.exports = class UsersSource {
  constructor() {
    this.usersSource = [];
  }

  getUser(id) {
    const user = this.usersSource.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      return this.addUser();
    }
  }

  addUser() {
    const newId = uuidv4();
    this.usersSource.push(new User(newId));
    return this.getUser(newId);
  }

  withUser(user) {
    this.usersSource.push(user)
  }
};
