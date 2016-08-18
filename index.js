const fs = require('fs')
const path = require('path')
const readLine = require('readline')
const glob = require('glob')
const budo = require('budo')

const config = {
  src: './src/',
  dest: './blog/',
  title: 'My Blog',
  theme: 'default'
}

const getFiles = (cb) => {
  glob(config.src + '**/*.md', {}, (err, files) => {
    if (err) return cb(err)
    let parsed = {
      theme: config.theme,
      title: config.title,
      posts: []
    }
    files.forEach((file, k) => {
      const regex = new RegExp(config.src + '|posts/|.md', 'g')
      let post = {
        path: file.replace(regex, ''),
        body: '',
        title: null
      }
      const lineReader = readLine.createInterface({
        input: fs.createReadStream(file)
      })
      lineReader.on('line', (line) => {
        if (!post.title) {
          post.title = line.replace(/^[^a-zA-Z]+/, '')
        }
        post.body += line + '\n'
      })
      lineReader.on('close', () => {
        parsed.posts.push(post)
        if (k + 1 === files.length) {
          return cb(null, parsed)
        }
      })
    })
  })
}

getFiles((err, res) => {
  if (!fs.existsSync(config.dest)) {
    fs.mkdirSync(config.dest)
  }
  fs.writeFileSync(config.dest + 'data.json', JSON.stringify(res))
  budo(config.src + 'app/app.js', {
    live: true,
    pushstate: true,
    dir: config.dest
  })
    .on('connect', ev => console.log('Server running on %s', ev.uri))
    .on('update', (buffer) => {
    console.log('bundle - %dkb', buffer.length / 1000)
  })
})
