// --------------------------------------------------------------------------------------------------------------------

// npm
var test = require('tape')

// local
var Router = require('../')

// --------------------------------------------------------------------------------------------------------------------

test('make sure the default is returned if there is no hash', function(t) {
  t.plan(3)

  var r = new Router({ def : 'dashboard' })

  var newHash1 = r.route('#')
  t.equal(newHash1, '#dashboard', 'Default hash is returned for empty string')

  var newHash2 = r.route('#')
  t.equal(newHash2, '#dashboard', 'Default hash is returned for #')

  var newHash3 = r.route('#/')
  t.equal(newHash3, '#dashboard', 'Default hash is returned for #/')
})

// --------------------------------------------------------------------------------------------------------------------
