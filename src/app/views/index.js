const html = require('choo/html')
const postsList = require('./posts')

module.exports = (state, prev, send) => {
  return html`
    <div class='index view'>
      <h2> Index </h2>
      ${state.app.title}
      ${postsList(state.app.posts, send)}
    </div>
  `
}

