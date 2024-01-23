'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('urls', [
      {
        original: 'https://www.example1.com',
        short: 'https://sho.rt/abc123',
        hash: 'abc123',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        original: 'https://www.example1-1.com',
        short: 'https://sho.rt/abc123',
        hash: 'abc123',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        original: 'https://www.example2.com',
        short: 'https://sho.rt/def456',
        hash: 'def456',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        original: 'https://www.example3.com',
        short: 'https://sho.rt/ghi789',
        hash: 'ghi789',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
      {
        original: 'https://www.example3-1.com',
        short: 'https://sho.rt/abc123',
        hash: 'abc123',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
      {
        original: 'https://www.example4.com',
        short: 'https://sho.rt/jkl012',
        hash: 'jkl012',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 4,
      },
      {
        original: 'https://www.example5.com',
        short: 'https://sho.rt/mno345',
        hash: 'mno345',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 5,
      },
      {
        original: 'https://www.example3-2.com',
        short: 'https://sho.rt/abc123',
        hash: 'abc123',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
      {
        original: 'https://www.example6.com',
        short: 'https://sho.rt/pqr678',
        hash: 'pqr678',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 6,
      },
      {
        original: 'https://www.example7.com',
        short: 'https://sho.rt/stu901',
        hash: 'stu901',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 7,
      },
      {
        original: 'https://www.example8.com',
        short: 'https://sho.rt/vwx234',
        hash: 'vwx234',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 8,
      },
      {
        original: 'https://www.example7-1.com',
        short: 'https://sho.rt/stu901',
        hash: 'stu901',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 7,
      },
      {
        original: 'https://www.example9.com',
        short: 'https://sho.rt/yz012',
        hash: 'yz012',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 9,
      },
      {
        original: 'https://www.example10.com',
        short: 'https://sho.rt/abc345',
        hash: 'abc345',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 10,
      },
      {
        original: 'https://www.example7-2.com',
        short: 'https://sho.rt/stu901',
        hash: 'stu901',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 7,
      },
      {
        original: 'https://www.example7-3.com',
        short: 'https://sho.rt/stu901',
        hash: 'stu901',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 7,
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
