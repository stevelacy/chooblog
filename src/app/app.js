const choo = require('choo')

const app = choo()
const routes = {
  app: require('./views/app'),
  index: require('./views/index'),
  post: require('./views/post')
}

app.model(require('./models/index'))

app.router(route => [
  route('/', routes.app(routes.index), [
    route('/:post', routes.app(routes.post))
  ]),
])

const tree = app.start()
document.body.appendChild(tree)
