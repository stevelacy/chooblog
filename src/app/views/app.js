const html = require('choo/html')

module.exports = (view) => {
  return function (params, state, send) {
    return html`
      <main class='main view'>
        <header class='header'>
          logo
        </header>
        ${view(params, state, send)}
        <footer class='footer'>
          footer
        </footer>
      </main>
    `
  }
}
