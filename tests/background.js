var chrome = require('./chrome-mock')
var expect = require('chai').expect

// Bootstrap background.js
var Middleman = require('../background')

describe('background.js', function() {
  describe('Middleman', function() {
    describe('transform', function() {
      it('should remove headers that equal `null`', function() {
        var headers = commonHeaders()
        Middleman.transform(headers, [ { name: 'Emerson', value: null }])

        expect(headers).to.have.lengthOf(2)
        expect(headers[0].name).to.equal('Ned')
        expect(headers[1].name).to.equal('Chuck')
      })

      it('should modify pre-existing headers', function() {
        var headers = commonHeaders()
        Middleman.transform(headers, [ { name: 'Chuck', value: 'Wildcard' }])

        expect(headers).to.have.lengthOf(3)
        expect(headers[1].value).to.equal('Wildcard')
      })

      it('should add new headers', function() {
        var headers = commonHeaders()
        Middleman.transform(headers, [ { name: 'Digby', value: 'Dog' }])

        expect(headers).to.have.lengthOf(4)
        expect(headers[3].name).to.equal('Digby')
        expect(headers[3].value).to.equal('Dog')
      })
    })
    describe('transformer', function() {
      beforeEach(function() {
        this.__transform = Middleman.transform
        Middleman.transform = function() {
          Middleman.transform.hasBeenCalled = true
          Middleman.transform.numTimesCalled++
        }
        Middleman.transform.hasBeenCalled = false
        Middleman.transform.numTimesCalled = 0
      })

      afterEach(function() {
        Middleman.transform = this.__transform
        Middleman.rules = []
      })

      it('should only modify requests of type `main_frame`', function() {
        Middleman.rules = [
          { pattern: /foo/, headers: commonHeaders() }
        ]

        Middleman.transformer(makeDetails('foo.com', [], 'not_the_main_frame'))
        expect(Middleman.transform.hasBeenCalled).to.be.false

        Middleman.transformer(makeDetails('foo.com'))
        expect(Middleman.transform.hasBeenCalled).to.be.true
      })

      it('should only modify requests when a rule matches the url', function() {
        Middleman.rules = [
          { pattern: /foo/, headers: commonHeaders() },
          {
            pattern: /definitely wont match this/,
            headers: [ { name: 'Set You Up', value: 'The Bomb' } ]
          }
        ]

        var newDetails = Middleman.transformer(makeDetails('foo.com'))
        expect(Middleman.transform.numTimesCalled).to.equal(1)
      })

      it('should modify requests using every rule that matches the url', function() {
        Middleman.rules = [
          { pattern: /one/, headers: commonHeaders() },
          { pattern: /two/, headers: commonHeaders() },
          { pattern: /three/, headers: commonHeaders() },
        ]

        Middleman.transformer(makeDetails('one.com/three'))
        expect(Middleman.transform.numTimesCalled).to.equal(2)
      })
    })
  })
})

function commonHeaders() {
  return [
    { name : 'Ned',     value : 'Main Character'        },
    { name : 'Chuck',   value : 'Childood Sweetheart'   },
    { name : 'Emerson', value : 'Boss'                  }
  ]
}

function makeDetails(url, headers, type) {
  return {
    url            : url,
    requestHeaders : headers || [],
    type           : type || 'main_frame'
  }
}

function findIndexBy(arr, prop, val) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i][prop] === val) return i
  }
}
