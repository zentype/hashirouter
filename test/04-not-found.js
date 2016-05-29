// --------------------------------------------------------------------------------------------------------------------

// npm
var test = require('tape')

// local
var Router = require('../')

// --------------------------------------------------------------------------------------------------------------------

test('add a route and check the not-found route is called', function(t) {
  t.plan(3)

  var r = new Router({ def : 'dashboard' })

  r.add('inbox', function() {
    t.fail('Inbox should not be triggered')
  })

  r.addNotFound(function(hash) {
    t.pass('The notFound route is triggered')
    t.equal(hash, 'drafts', 'The hash given back to the notFound handler is correct')
  })

  t.equal(r.getRoutes().length, 1, 'The router now has one route')
  r.route('drafts')
})

// --------------------------------------------------------------------------------------------------------------------
