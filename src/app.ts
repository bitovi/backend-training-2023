import Koa from 'koa'
import koaBody from 'koa-body'
import Router from 'koa-router'
import { RatesModel, UsersModel, LoanApplicationsModel } from './models'
import { readMiddleware, updateMiddleware } from './middleware'

const { HTTP_PORT } = process.env

const app = new Koa()
const router = new Router()

app.use(koaBody())

app.use(async(ctx, next) => {
  try {
    await next()
  } catch (error) {
    // Sequelize errors are dumb
    if (error instanceof Error) {
      console.error(error.message)
    }
    console.error(error)
    throw error
  }
})

router.get('/rates/:uuid', readMiddleware(RatesModel))

router.get('/users/:uuid', readMiddleware(UsersModel))

router.get('/loans/:uuid', readMiddleware(LoanApplicationsModel))
router.patch('/loans/:uuid', updateMiddleware(LoanApplicationsModel), readMiddleware(LoanApplicationsModel))

app.use(router.routes())

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))
