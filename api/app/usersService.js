module.exports = class UsersService {
  constructor(userSource) {
    this.userSource = userSource;
  }

  getUser(id) {
    return this.userSource.getUser(id);
  }

  addUser() {
    return this.userSource.addUser();
  }
};
