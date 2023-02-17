module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'interest_rates', // table name
        'minimum_credit_score', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('interest_rates', 'minimum_credit_score')
    ]);
  }
}
