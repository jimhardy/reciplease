module.exports = class UserService {
  constructor(userSource) {
    this.userSource = userSource;
    this.healthy = true;
    console.log('UserService initialized');
  }

  getUser(id) {
    return this.userSource.getUser(id);
  }

  addUser() {
    return this.userSource.addUser();
  }
};
