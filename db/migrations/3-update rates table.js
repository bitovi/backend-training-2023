/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn('interest_rates', 'minimum_credit_score', DataTypes.INTEGER)
      await transaction.commit()
    } catch (error) {
      console.error(error)
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.removeColumn('interest_rates', 'minimum_credit_score')
    } catch (error) {
      console.error(error)
    }
  }
}
