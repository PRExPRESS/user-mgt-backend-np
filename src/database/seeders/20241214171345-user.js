'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [

      { name: 'John Doe', 
        email: 'Lb4ZV@example.com', 
        phone: '123-456-7890', 
        address: '123 Main St, Anytown, USA', 
        admin_id: 1, 
        company_id: 1 ,
        createdAt: new Date(), 
        updatedAt: new Date()},
      { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', address: '456 Oak St, Somecity, USA', admin_id: 1, company_id: 2 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'Michael Brown', email: 'michael.brown@example.com', phone: '555-123-4567', address: '789 Pine St, Cityville, USA', admin_id: 1, company_id: 3 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'Emily Johnson', email: 'emily.johnson@example.com', phone: '666-234-5678', address: '321 Birch Rd, Townsville, USA', admin_id: 1, company_id: 4 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'David Lee', email: 'david.lee@example.com', phone: '777-345-6789', address: '654 Maple Ave, Village, USA', admin_id: 1, company_id: 1 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'Sarah Williams', email: 'sarah.williams@example.com', phone: '888-456-7890', address: '987 Cedar Blvd, Metropolis, USA', admin_id: 1, company_id: 2 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'James Harris', email: 'james.harris@example.com', phone: '999-567-8901', address: '123 Elm St, Capital City, USA', admin_id: 1, company_id: 3 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'Patricia Clark', email: 'patricia.clark@example.com', phone: '234-678-9012', address: '876 Redwood Ln, Springfield, USA', admin_id: 1, company_id: 4 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'Daniel Lewis', email: 'daniel.lewis@example.com', phone: '345-789-0123', address: '543 Willow Dr, Greenfield, USA', admin_id: 1, company_id: 1 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'Barbara Scott', email: 'barbara.scott@example.com', phone: '456-890-1234', address: '210 Birch St, Lakeview, USA', admin_id: 1, company_id: 2 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'Matthew Robinson', email: 'matthew.robinson@example.com', phone: '567-901-2345', address: '789 Chestnut St, Clearview, USA', admin_id: 1, company_id: 3 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'Linda Adams', email: 'linda.adams@example.com', phone: '678-012-3456', address: '432 Pine Rd, Rivertown, USA', admin_id: 1, company_id: 4 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'Robert Martinez', email: 'robert.martinez@example.com', phone: '789-123-4567', address: '210 Maple St, Oceanside, USA', admin_id: 1, company_id: 1 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'Jennifer Young', email: 'jennifer.young@example.com', phone: '890-234-5678', address: '654 Oak Ln, Bayview, USA', admin_id: 1, company_id: 2 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'William Hall', email: 'william.hall@example.com', phone: '901-345-6789', address: '321 Pine Ave, Highland Park, USA', admin_id: 1, company_id: 3 ,createdAt: new Date(), updatedAt: new Date()},
      { name: 'Jessica Allen', email: 'jessica.allen@example.com', phone: '012-456-7890', address: '876 Maple Rd, Lakeside, USA', admin_id: 1, company_id: 4 ,createdAt: new Date(), updatedAt: new Date()}


    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
