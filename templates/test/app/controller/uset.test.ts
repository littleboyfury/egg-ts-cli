import { app } from 'egg-mock/bootstrap'
import * as assert from 'power-assert'


describe('Controller User', () => {
  describe('', () => {
    it('normal', async () => {
      return app.httpRequest()
        .get('/api/v1/users')
        .expect(200)
        .expect(res => {
          assert.deepEqual(res.body, { user: 'test' })
        })
    })
  })
})
