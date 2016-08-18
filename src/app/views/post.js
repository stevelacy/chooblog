const html = require('choo/html')
const marked = require('marked')

module.exports = (state, prev, send) => {
  let post = state.app.posts.filter(v => v.path === state.params.post)

  if (!post || !post[0]) {
    return html`
      <div class='error 404'> 404 not found </div>
    `
  }
  post = post[0]
  const body = document.createElement('span')
  body.innerHTML = marked(post.body)

  return html`
    <div class='post view'>
      <div class='body'>
        ${body}
      </div>
    </div>
  `
}
