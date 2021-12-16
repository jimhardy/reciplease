const { v4: uuidv4 } = require('uuid');
const User = require('../../user');

// todo: add irl implementation with clouddb

module.exports = class UserSource {
  constructor() {
    this.userSource = [];
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

  withUser(user) {
    this.userSource.push(user)
  }
};
