import createHttpError from 'http-errors'
import { LoanApplicationsModel, RatesModel, UsersModel } from './models'

LoanApplicationsModel.addHook('beforeUpdate', async (record) => {
  // Do the thing
  try {
    const rate: any = await RatesModel.findByPk(record.getDataValue('interest_rate_uuid'));
    const user: any = await UsersModel.findByPk(record.getDataValue('applicant'));
    if (user.credit_score < rate.minimum_credit_score) {
      throw createHttpError(409, 'nope')
    }
  } catch (e) {
    console.error(e);
    throw e;
  }

  // Set the current_balance when the loan is approved
  if (record.previous('status') === 'pending' && record.getDataValue('status') === 'approved') {
    record.setDataValue('current_balance', record.getDataValue('requested_amount'))
  }
})
