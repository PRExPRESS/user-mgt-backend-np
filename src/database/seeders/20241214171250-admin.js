'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      const hashedPassword = await bcrypt.hash('12345abc', 10);
      await queryInterface.bulkInsert('admins', [{
        name: 'Test Admin',
        email: '6E0dH@example.com',
        password: hashedPassword,
        phone: '1234567890',
        address: 'Test Address',
        createdAt: new Date(),
        updatedAt: new Date()
        
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('admins', null, {});
     
  }
};
