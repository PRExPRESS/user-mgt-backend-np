'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('companies', [
        {name: 'Apple.Inc', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Google.Inc', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Microsoft.Inc', createdAt: new Date(), updatedAt: new Date(),},
        {name: 'Amazon.Inc', createdAt: new Date(), updatedAt: new Date(),},
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('companies', null, {});
     
  }
};
