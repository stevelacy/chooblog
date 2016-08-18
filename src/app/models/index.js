module.exports = {
  namespace: 'app',
  state: {
    title: 'test',
    posts: []
  },
  subscriptions: [
    (send, done) => {
      fetch('/data.json')
        .then(res => res.json())
        .then((payload) => send('app:init', { payload }, (err) => {
          if (err) return done(err)
        }))
        .catch(done)
    }
  ],
  reducers: {
    init: (data, state) => ({
      posts: data.payload.posts,
      title: data.payload.title
    })
  }
}
