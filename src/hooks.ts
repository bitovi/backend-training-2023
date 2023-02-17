import createError from 'http-errors'
import { LoanApplicationsModel, RatesModel, UsersModel } from './models'

LoanApplicationsModel.addHook('beforeUpdate', async (record) => {
  // If interest_rate_uuid id null, throw RateMissingError
  if (!record.getDataValue('interest_rate_uuid')) {
    throw createError(418, 'RateMissingError')
  }

  // Fetch the corresponding Rate for this loan
  const rate = await RatesModel.findByPk(record.getDataValue('interest_rate_uuid'))
  if (!rate) {
    throw createError(418, 'UnknownRateError')
  }

  // Fetch the corresponding User for this loan
  const applicant = await UsersModel.findByPk(record.getDataValue('applicant'))
  if (!applicant) {
    throw createError(418, 'UnknownApplicantError')
  }

  // Check if user’s creditScore is equal to or above rate’s minimumCreditScore
  if (applicant?.getDataValue('creditScore') < rate?.getDataValue('minimumCreditScore')) {
    throw createError(418, 'BadRateError')
  }

  // Set the current_balance when the loan is approved
  if (record.previous('status') === 'pending' && record.getDataValue('status') === 'approved') {
    record.setDataValue('current_balance', record.getDataValue('requested_amount'))
  }
})
