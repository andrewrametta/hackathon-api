const knex = require("knex");
const bcrypt = require("bcryptjs");

const UsersService = {
  hasUserWithUsername(knex, username) {
    return knex("users")
      .where({ username })
      .first()
      .then((user) => !!user);
  },
  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into("users")
      .returning("*")
      .then(([user]) => user);
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
};

module.exports = UsersService;
