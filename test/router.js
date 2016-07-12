// --------------------------------------------------------------------------------------------------------------------

// npm
var test = require('tape')

// local
var Router = require('../')

// --------------------------------------------------------------------------------------------------------------------

test('add a route and check it is called', function(t) {
  t.plan(3)

  var r = new Router({ def : 'dashboard' })

  r.add('inbox', function() {
    t.pass('Inbox was triggered')
  })

  t.equal(r.getRoutes().length, 1, 'The router now has one route')
  r.route('inbox')
  t.pass('All finished, which also proves the route is called synchronously')
})

test('add a route and check it is not called', function(t) {
  t.plan(1)

  var r = new Router({ def : 'dashboard' })

  r.add('inbox', function() {
    t.fail('Inbox should not be triggered')
  })

  t.equal(r.getRoutes().length, 1, 'The router now has one route')
  r.route('drafts')
})

test('add a multi-level route and check it is called', function(t) {
  t.plan(3)

  var r = new Router({ def : 'dashboard' })

  r.add('page/about', function() {
    t.pass('About was triggered')
  })

  t.equal(r.getRoutes().length, 1, 'The router now has one route')
  r.route('page/about')
  t.pass('All finished, which also proves the route is called synchronously')
})

// --------------------------------------------------------------------------------------------------------------------
