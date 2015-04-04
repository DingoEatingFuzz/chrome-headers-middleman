// For testing
typeof require === 'function' && (chrome = require('./tests/chrome-mock'))

var Middleman = {
  rules: [],
  transformer: function(details) {
    var rules = Middleman.rules
    if (details.type === 'main_frame') {
      rules.forEach(function(rule) {
        rule.pattern.test(details.url) && Middleman.transform(details.requestHeaders, rule.headers)
      })
    }
    return { requestHeaders: details.requestHeaders }
  },
  transform: function(oldHeaders, newHeaders) {
    newHeaders.forEach(function(header) {
      if (header.value === null) {
        // remove the header
        var idx = findIndexBy(oldHeaders, 'name', header.name)
        if (idx !== undefined) {
          oldHeaders.splice(idx, 1)
        }
      } else {
        var requestHeader = findBy(oldHeaders, 'name', header.name)
        if (requestHeader) {
          // modify the header
          requestHeader.value = header.value
        } else {
          // add the header
          oldHeaders.push({
            name: header.name,
            value: header.value
          })
        }
      }
    })
  }
}

refresh()

chrome.storage.onChanged.addListener(function() {
  refresh()
})

chrome.webRequest.onBeforeSendHeaders.addListener(
  Middleman.transformer,
  { urls: [ '<all_urls>' ] },
  [ 'blocking', 'requestHeaders' ]
)

function findIndexBy(arr, prop, val) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i][prop] === val) return i
  }
}

function findBy(arr, prop, val) {
  return arr[findIndexBy(arr, prop, val)]
}

function refresh() {
  chrome.storage.sync.get(null, function(d) {
    d.rules && d.rules.forEach(function(rule) {
      rule.pattern = new RegExp(rule.pattern)
    })
    Middleman.rules = d.rules
  })
}

// For testing
typeof module === 'object' && (module.exports = Middleman)
