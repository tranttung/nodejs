'use strict';



module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: "admin@gmail.com",
      password: "123456",
      firstName: 'nguyen',
      lastName: 'huunguyen',
      gender: 1,
      address: "viet nam",
      phonenumber: "039135413651",
      positionId: '1231212',
      image: '13212',
      roleId: "1232",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
