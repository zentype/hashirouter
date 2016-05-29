// --------------------------------------------------------------------------------------------------------------------

// npm
var test = require('tape')

// local
var Router = require('../')

// --------------------------------------------------------------------------------------------------------------------

test('create a router', function(t) {
  t.plan(3)

  try {
    var r1 = new Router()
    t.fail("new Router() without a 'def' should have thrown")
  }
  catch(e) {
    t.pass("new Router() without a 'def' throws")
  }

  try {
    var r2 = new Router({})
    t.fail("new Router() without a 'def' should have thrown")
  }
  catch(e) {
    t.pass("new Router() without a 'def' throws")
  }

  try {
    var r3 = new Router({
      def : 'dashboard'
    })
    t.pass("new Router() with a 'def' doesn't throw")
  }
  catch(e) {
    t.fail("new Router() with a 'def' shouldn't throw")
  }

})

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
