import { LoanApplicationsModel, UsersModel, RatesModel } from './models'

LoanApplicationsModel.addHook('beforeUpdate', async (record) => {
  if(record.previous('status') === 'pending' && record.getDataValue('status') === 'approved') {
    const user: any = await UsersModel.findByPk(record.getDataValue('applicant'))
    const interestRate: any = await RatesModel.findByPk(record.getDataValue('interest_rate_uuid'))
    console.log(user, interestRate)
    if (!user || !interestRate) {
      throw new Error('Invalid user id or interest rate id')
    }
    if (user.credit_score < interestRate.required_credit_score) {
      console.log('HIT\n\n\n')
      record.setDataValue('status', 'denied')
    } else {
      record.setDataValue('current_balance', record.getDataValue('requested_amount'))
    }
  }
})
