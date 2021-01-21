'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     */
     await queryInterface.bulkInsert('users', [{
       username: 'Bayu Suryo',
       password: 'bayu1234',
       age: 28,
       email:'bayu.suryo.a@gmail.com',
       createdAt: new Date,
       updatedAt:new Date
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     */ 
      await queryInterface.bulkDelete('users', null, {});
     
  }
};
