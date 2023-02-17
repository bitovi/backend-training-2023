/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('loan_applications', [
      { // doesn't qualify
        uuid: '19b75a10-cb68-4df9-83c3-16f752aba227',
        current_balance: null,
        requested_amount: 11000,
        applicant: '3ea2c3c2-ca8f-46bd-bb91-1941bc7fc048',
        status: 'pending',
        interest_rate_uuid: '97d9edc3-34bf-4832-bc3d-76b9c867472c'
      },
      { // invalid interest rate
        uuid: '8f6231c5-24fb-4793-92ba-81d5cfce774d',
        current_balance: null,
        requested_amount: 250000,
        applicant: '7643924d-a556-4bf5-ad00-13130f0c8acf',
        status: 'pending',
        interest_rate_uuid: 'invalid'
      },
      { // valid application
        uuid: '0685141e-f1b4-4c8b-81ed-c71d585a6081',
        current_balance: null,
        requested_amount: 75000,
        applicant: 'a6dc157d-575b-410d-9be7-f20248772095',
        status: 'pending',
        interest_rate_uuid: '97d9edc3-34bf-4832-bc3d-76b9c867472c'
      }
    ])
  }
}
