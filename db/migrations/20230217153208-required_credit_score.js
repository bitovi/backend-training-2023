'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize
    try {
      await queryInterface.addColumn('interest_rates', 'required_credit_score', { type: DataTypes.INTEGER })
      await queryInterface.addColumn('users', 'credit_score', { type: DataTypes.INTEGER })
    } catch (err) {
      console.log(err)
      throw err
    }
  },

  async down (queryInterface, _Sequelize) {
    try {
      await queryInterface.removeColumn('interest_rates', 'required_credit_score')
      await queryInterface.removeColumn('users', 'credit_score')
    } catch (err) {
      console.log(err)
      throw err
    }
  }
};
