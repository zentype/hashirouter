// --------------------------------------------------------------------------------------------------------------------

// npm
var test = require('tape')

// local
var Router = require('../')

// --------------------------------------------------------------------------------------------------------------------

test('make sure a new hash is returned from .route() if not yet normalised', function(t) {
  t.plan(3)

  var r = new Router({ def : 'dashboard' })

  var newHash1 = r.route('#/dashboard')
  t.equal(newHash1, '#dashboard', 'New hash for dashboard is returned ok')

  var newHash2 = r.route('/hashit/')
  t.equal(newHash2, '#hashit', 'New hash for hashit is returned ok')

  var newHash3 = r.route('#/whatever/is/here/')
  t.equal(newHash3, '#whatever/is/here', 'New hash for whatever/is/here is returned ok')
})

// --------------------------------------------------------------------------------------------------------------------
