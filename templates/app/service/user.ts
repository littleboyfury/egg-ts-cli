import { Service } from 'egg'

export default class UserService extends Service {

  public async showUser(): Promise<string> {
    return 'test'
  }
}
