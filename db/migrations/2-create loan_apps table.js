/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, sequelize) {
    const { DataTypes } = sequelize
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('loan_applications', {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        current_balance: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: true
        },
        original_balance: {
          type: DataTypes.DECIMAL(12, 2)
        },
        applicant: {
          type: DataTypes.UUID
        },
        status: {
          type: DataTypes.ENUM('pending', 'approved', 'denied'),
          defaultValue: 'pending'
        },
        interest_rate_uuid: {
          type: DataTypes.UUID,
          allowNull: true
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
      await queryInterface.dropTable('loan_applications')
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
