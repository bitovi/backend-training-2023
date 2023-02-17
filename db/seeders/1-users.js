/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        uuid: '3ea2c3c2-ca8f-46bd-bb91-1941bc7fc048',
        first_name: 'Micheal',
        last_name: 'Scott',
        email: 'mscott@dundermifflinpapercompany.com',
        credit_score: 500
      },
      {
        uuid: '7643924d-a556-4bf5-ad00-13130f0c8acf',
        first_name: 'Dwight',
        last_name: 'Schrute',
        email: 'dschrute@dundermifflinpapercompany.com',
        credit_score: 680
      },
      {
        uuid: 'a6dc157d-575b-410d-9be7-f20248772095',
        first_name: 'Jim',
        last_name: 'Halpert',
        email: 'jhalpert@dundermifflinpapercompany.com',
        credit_score: 850
      }
    ])
  }
}
