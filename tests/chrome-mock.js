module.exports = {
  storage: {
    sync: {
      get: function(key, fn) {
        setTimeout(function() {
          fn(chrome._storage)
        }, 0)
      }
    },
    onChanged: {
      addListener: noop()
    }
  },
  webRequest: {
    onBeforeSendHeaders: {
      addListener: noop()
    }
  }
}

function noop() {
  return function() {}
}