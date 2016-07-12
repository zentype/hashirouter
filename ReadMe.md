# HashiRouter #

HashiRouter is an explicit router that can be used to route hash changes in the browser, history state transitions
or node HTTP requests on the server.

Features:

* set a default route if none is given
* pattern matching and named placeholders
* no fall-through
* can define both `/post/+new` and `/post/:post_id` and match correctly, presuming they're added in the correct order
* normalises the hash it was passed and returns it (without calling a function)
* a 'not found' function can be called for any unknown routes
* doesn't hijack or add itself to any listeners, which you need to do explicitely

## Synopsis ##

HashiRouter is designed to be used in the browser to route hash changes, but can be used for hidtory changes
and on the server in node too. This example will show an example hash application:

```js
var router = new HashiRouter({
    def : 'dashboard',
});

router.add('dashboard', function() {
    console.log('Hash changed to #dashboard');
});

router.add('/blog/:post_id', function(post_id) {
    console.log('You are viewing post_id=' + post_id);
});

router.setNotFound(function(hash) {
    console.log('Unknown hash=' + hash);
});

function onHashChange() {
  var hash = window.location.hash;

  // calls a function you provided OR returns a newHash (not both)
  var newHash = router.router(hash);
  if ( newHash ) {
    window.location.hash = newHash;
  }
}

// when there is a hashChange, call our function
window.addEventListener('hashchange', onHashChange, false);
```

In regular usage the following happens:

* '#dashboard' -> calls the dashboard route, returns null
* '#blog/hello-world -> calls the post route with 'hello-world' as the post_id, returns null
* '#unknown' -> calls the Not Found route with 'unknown', returns null

New routes are returned when normalising each route:

* '#/dashboard/' -> returns 'dashboard', no route is called
* '#/blog/hello-world/' -> returns 'blog/hello-world', no route is called

The default route is called if there is no (or an empty) hash:

* '# -> calls the dashboard route, returns null
* '#dashboard' -> calls the dashboard route, returns null

## Author ##

[Andrew Chilton](https://chilts.org/) for [ZenType](https://zentype.io/).

* [Email](email:andychilton@gmail.com)
* [Twitter](https://twitter.com/andychilton)
* [GitHub](https://github.com/chilts)

## License ##

ISC

(Ends)
