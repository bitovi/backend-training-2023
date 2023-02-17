/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize
    try {
      await queryInterface.addColumn(
        'users',
        'credit_score',
        {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      )
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  async down (queryInterface) {
    try {
      await queryInterface.removeColumn('users', 'credit_score')
    } catch (error) {
      console.error(error)
    }
  }
};
