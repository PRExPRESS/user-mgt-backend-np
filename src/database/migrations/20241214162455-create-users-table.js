'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.createTable('users', { 
        id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        admin_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'admins',
            key: 'id',
            
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        company_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'companies',
            key: 'id',
            
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        
        phone: {
          type: Sequelize.STRING,
          allowNull: true
        },
        address: {
          type: Sequelize.STRING,
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
       });
     
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.dropTable('users');
     
  }
};
