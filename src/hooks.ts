import { LoanApplicationsModel, RatesModel, UsersModel } from './models'
import CreateError from 'http-errors'

// see an error message when attempting to approve a loan application with a user that has a credit_score that is less than the minimum_credit_score attached to the interest_rate_uuid provided, 
// where the credit_score of the user is greater than the minimum_credit_score attached to the interest_rate_uuid provided and see that new status is approved on the loan
// If a user has the same credit_score as the minimum_credit_score the loan should still be approved
LoanApplicationsModel.addHook('beforeUpdate', async(record: any) => {
  // Approve loan if credit score of user is greater than the
  // minimum_credit_score attached to the interest_rate_uuid provided
  const applicantId = record.getDataValue('applicant')
  const interestRateId = record.getDataValue('interest_rate_uuid')

  const interestRate = await RatesModel.findByPk(interestRateId)

  if (!interestRate) {
    throw CreateError(409, 'Invalid interest rate')
  }

  const applicantRecord = await UsersModel.findByPk(applicantId)
  console.log(applicantRecord)

  // Set the current_balance when the loan is approved
  // if (record.previous('status') === 'pending' && record.getDataValue('status') === 'approved') {
  //   record.setDataValue('current_balance', record.getDataValue('requested_amount'))
  // }
})
