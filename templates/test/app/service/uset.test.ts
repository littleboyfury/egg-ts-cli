import { Context } from 'egg'
import { app } from 'egg-mock/bootstrap'
import * as assert from 'power-assert'

describe('Service User', () => {

  let ctx: Context

  before(() => (ctx = app.mockContext()))

  describe('show user', () => {
    it('normal', async () => {
      const res = await ctx.service.user.showUser()
      assert.equal(res, 'test')
    })
  })
})
