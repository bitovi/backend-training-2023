/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, sequelize) {
    const { DataTypes } = sequelize
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('users', {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        first_name: {
          type: DataTypes.STRING(50)
        },
        last_name: {
          type: DataTypes.STRING(50)
        },
        email: {
          type: DataTypes.STRING(254)
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { transaction })
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
      await queryInterface.dropTable('users')
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
