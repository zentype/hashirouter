// --------------------------------------------------------------------------------------------------------------------

// npm
var test = require('tape')

// local
var Router = require('../')

// --------------------------------------------------------------------------------------------------------------------

test('add a route with a param and check it is called with the correct arg', function(t) {
  t.plan(3)

  var r = new Router({ def : 'dashboard' })
  var self = this;

  r.add('inbox/:id', function(id) {
    t.pass('inbox/:id should be triggered')
    t.equal(id, 'deadbeef', 'Route was triggered with the correct args');
  })

  t.equal(r.getRoutes().length, 1, 'The router now has one route')
  r.route('inbox/deadbeef')
})

test('add a longer route with a param and check it is called with the correct arg', function(t) {
  t.plan(3)

  var r = new Router({ def : 'dashboard' })
  var self = this;

  r.add('blog/:hostname/+new', function(hostname) {
    t.pass('blog/:hostname/+new should be triggered')
    t.equal(hostname, 'zentype.io', 'Route was triggered with the correct args');
  })

  t.equal(r.getRoutes().length, 1, 'The router now has one route')
  r.route('blog/zentype.io/+new')
})

test('add a few routes and match on the last one', function(t) {
  t.plan(3)

  var r = new Router({ def : 'dashboard' })
  var self = this;

  r.add('dashboard', function(hostname) {
    t.fail("Shouldn't call this first route");
  })

  r.add('blog/:hostname', function(hostname) {
    t.pass('blog/:hostname should be triggered')
    t.equal(hostname, 'blog.zentype.io', 'Route was triggered with the correct args');
  })

  t.equal(r.getRoutes().length, 2, 'The router now has one route')
  r.route('blog/blog.zentype.io')
})

test('add a few routes and check various ones are called or not', function(t) {
  t.plan(3)

  var r = new Router({ def : 'dashboard', debug : true })

  r.add('dashboard', function() {
    t.fail('dashboard should not be triggered')
  });

  r.add('blog/:hostname', function(hostname) {
    t.fail('hostname should not be triggered')
  });

  r.add('blog/:hostname/post', function(hostname) {
    t.fail('posts should not be triggered')
  });

  r.add('blog/:hostname/category', function(hostname) {
    t.pass('category should be triggered')
    t.equal(hostname, 'blog.zentype.io', 'Route was triggered with the correct args');
  });

  r.add('blog/:hostname/tag', function(hostname) {
    t.fail('tag should not be triggered')
  });

  r.setNotFound(function(hash) {
    t.fail('the notFound function should not be triggered')
  });

  t.equal(r.getRoutes().length, 5, 'The router now has 5 routes')
  r.route('blog/blog.zentype.io/category')
})

// --------------------------------------------------------------------------------------------------------------------
