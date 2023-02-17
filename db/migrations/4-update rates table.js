const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('interest_rates', 'minimumCreditScore', DataTypes.INTEGER)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('interest_rates', 'minimumCreditScore')
  }
}
