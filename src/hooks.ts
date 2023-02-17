import { LoanApplicationsModel } from './models'

LoanApplicationsModel.addHook('beforeUpdate', (record) => {
  // Set the current_balance when the loan is approved
  if (record.previous('status') === 'pending' && record.getDataValue('status') === 'approved') {
    record.setDataValue('current_balance', record.getDataValue('requested_amount'))
  }
})
