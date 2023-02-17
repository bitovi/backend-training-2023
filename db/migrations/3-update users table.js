const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'creditScore', DataTypes.INTEGER)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'creditScore')
  }
}
