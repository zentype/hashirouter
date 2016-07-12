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

// --------------------------------------------------------------------------------------------------------------------
