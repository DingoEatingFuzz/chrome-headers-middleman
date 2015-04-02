var db = chrome.storage.sync

export default class DB {
  constructor(cb) {
    this.queue = []
    db.get(null, d => this.capture(d || {}) && cb(d || {}))
  }

  capture(data) {
    this.data = data
    this.queue.forEach(fn => fn(this))
    delete this.queue
    return true
  }

  then(fn) {
    if (this.data) fn()
    else this.queue.push(fn)
  }

  get(key) {
    if (!this.data) throw "Database not ready!"

    var parts = key.split('.')
    var v = this.data
    for (var i = 0, len = parts.length; i < len; i++) {
      if (!v) return null
      v = v[parts[i]]
    }
    return v
  }

  set(key, value, cb) {
    if (!this.data) throw "Database not ready!"

    if (typeof key === 'object') {
      this.data = key
      cb = value
    } else {
      var parts = key.split('.')
      var lastPart = parts.pop()
      var d = this.data
      parts.forEach(function(p) {
        if (!d[p]) d[p] = {}
        d = d[p]
      })
      d[lastPart] = value
      if (value === undefined) delete d[lastPart]
    }

    // This is kinda terrible, but I don't want to deal with it
    // If it becomes a perf bottleneck, I'll think of something
    db.clear(() => db.set(this.data, cb))
  }

  del(key, cb) {
    this.set(key, undefined, cb)
  }

  clear(cb) {
    db.clear(cb)
  }
}