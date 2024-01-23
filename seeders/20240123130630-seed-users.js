'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        username: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Alice Smith',
        email: 'alicesmith@gmail.com',
        password: 'secure123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Bob Johnson',
        email: 'bobjohnson@gmail.com',
        password: 'qwerty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Emily Davis',
        email: 'emilydavis@gmail.com',
        password: 'pass123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Michael Brown',
        email: 'michaelbrown@gmail.com',
        password: 'brownie',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Sophia White',
        email: 'sophiawhite@gmail.com',
        password: 'white123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'David Miller',
        email: 'davidmiller@gmail.com',
        password: 'miller456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Olivia Wilson',
        email: 'oliviawilson@gmail.com',
        password: 'olivia789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Daniel Taylor',
        email: 'danieltaylor@gmail.com',
        password: 'taylorpass',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Emma Clark',
        email: 'emmaclark@gmail.com',
        password: 'clarky',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
