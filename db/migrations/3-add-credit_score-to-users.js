/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, sequelize) {
    const { DataTypes } = sequelize
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn('users', 'credit_score', DataTypes.INTEGER(), { transaction })
      await transaction.commit()
    } catch (error) {
      console.error(error)
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropColumn('users', 'credit_score', {transaction})
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
