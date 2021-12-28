import { Controller } from 'egg'

export default class UserController extends Controller {
  public async showUser() {
    this.ctx.body = { user: await this.service.user.showUser() }
  }
}
