import { Middleware } from 'koa'
import { ModelDefined } from 'sequelize'

export function readMiddleware(Model: ModelDefined<Record<string, unknown>, Record<string, unknown>>): Middleware {
  return async (ctx) => {
    const { uuid } = ctx.params
    const loanApplication = await Model.findByPk(uuid)
    // if we don't set `ctx.body`, Koa will default to 404.
    if (loanApplication) {
      ctx.body = {
        loan_application: loanApplication
      }
    }
  }
}

export function updateMiddleware(Model: ModelDefined<Record<string, unknown>, Record<string, unknown>>): Middleware {
  return async (ctx, next) => {
    const { uuid } = ctx.params
    await Model.update(ctx.request.body, {
      where: {
        uuid
      },
      individualHooks: true
    })

    // We need to call next so that the following middleware (readMiddleware) can set the `ctx.body`
    await next()
  }
}
