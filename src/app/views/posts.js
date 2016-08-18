const html = require('choo/html')

module.exports = (posts, prev, send) => {

  const rows = posts ? posts.map((post) => {
    return html`
      <a
        href=${post.path}
        class='post'>
        ${post.title}
      </div>
    `
  }) : 'Loading...'

  return html`
    <div class='posts'>
      ${rows}
    </div>
  `
}
