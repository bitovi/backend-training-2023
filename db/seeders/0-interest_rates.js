/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('interest_rates', [
      {
        uuid: '8629aadb-e65b-4b28-a429-dd74c36ea60e',
        interest_percent: 3,
        required_credit_score: 610
      },
      {
        uuid: '79641672-c674-450a-813c-8e37c76ac66b',
        interest_percent: 2.5,
        required_credit_score: 650
      },
      {
        uuid: '97d9edc3-34bf-4832-bc3d-76b9c867472c',
        interest_percent: 2.25,
        required_credit_score: 700
      }
    ])
  }
}
