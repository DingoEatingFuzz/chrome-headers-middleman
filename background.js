var rules = []
refresh()

chrome.storage.onChanged.addListener(function() {
  refresh()
})

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    if (details.type === 'main_frame') {
      rules.forEach(function(rule) {
        if (new RegExp(rule.pattern).test(details.url)) {
          rule.headers.forEach(function(header) {
            if (header.value === null) {
              // delete
            } else {
              // try to find
              // else push
              details.requestHeaders.push({
                name: header.name,
                value: header.value
              })
            }
          })
        }
      });
    }
    return { requestHeaders: details.requestHeaders }
  },
  {
    urls: [ '<all_urls>' ]
  },
  [ 'blocking', 'requestHeaders' ]
)

function refresh() {
  chrome.storage.sync.get(null, function(d) {
    console.log('updating!', d)
    rules = d.rules
  })
}
