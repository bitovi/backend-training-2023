import { Sequelize, DataTypes } from 'sequelize'

const { DB_URL } = process.env

if (!DB_URL) {
  throw new Error('Missing DB_URL!')
}

const sequelize = new Sequelize(DB_URL)

export const LoanApplicationsModel = sequelize.define('loan_applications', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  current_balance: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  requested_amount: {
    type: DataTypes.DECIMAL(12, 2)
  },
  // TODO setup relationship to users
  applicant: {
    type: DataTypes.UUID
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'denied'),
    defaultValue: 'pending'
  },
  // TODO setup relationship to interest_rates
  interest_rate_uuid: DataTypes.UUID,
  created_at: DataTypes.DATE
}, {
  timestamps: false
})

export const RatesModel = sequelize.define('interest_rates', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  interest_percent: {
    type: DataTypes.TINYINT
  },
  minimum_credit_score: {
    type: DataTypes.INTEGER
  },
  created_at: DataTypes.DATE
}, {
  timestamps: false
})

export const UsersModel = sequelize.define('users', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING(50)
  },
  last_name: {
    type: DataTypes.STRING(50)
  },
  email: {
    type: DataTypes.STRING(254)
  },
  credit_score: {
    type: DataTypes.INTEGER
  },
  created_at: DataTypes.DATE
}, {
  timestamps: false
})
