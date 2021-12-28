import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/api/v1/users', controller.user.showUser)
}
