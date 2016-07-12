// --------------------------------------------------------------------------------------------------------------------

"use strict";

// --------------------------------------------------------------------------------------------------------------------

function HashiRouter(opts) {
  opts = opts || {};

  // check we got a default route
  if ( !opts.def ) {
    throw new Error("HashiRouter: provide a default route [opts.def]");
  }

  // keep these options
  this.opts = opts;

  // the routes which get added
  this.routes = [];

  // the notFound route (if set)
  this.notFound = null;
}

HashiRouter.prototype.add = function add(path, fn) {
  var segments = this.match(path);
  var route = {
    path     : path,
    segments : segments,
    length   : segments.length,
    fn       : fn,
  };
  this.routes.push(route);
};

HashiRouter.prototype.match = function match(path) {
  var segments = path.replace(/^#\/?|\/*$/g, '').split('/');
  return segments;
};

HashiRouter.prototype.getRoutes = function getRoutes() {
  return this.routes;
};

HashiRouter.prototype.route = function route(hash) {
  this.debug('Routing hash=' + hash);

  // firstly, replace any leading '#', '#/', '/' or trailing '/' with nothing
  var normalised = hash.replace(/^#?\/?|\/*$/g, '');

  // if we have nothing at all, just return the default
  if ( normalised.length === 0 ) {
    this.debug('No hash given, returning the default hash=#' + this.opts.def);
    return '#' + this.opts.def;
  }

  // if the normalise hash is different, then just tell the caller to set that
  if ( normalised !== hash ) {
    this.debug('Hash is not normalised - returning new hash=#' + normalised);
    return '#' + normalised;
  }

  var segments = normalised.split('/');

  // loop through all routes
  var matched = false;
  ROUTE: for ( var i = 0; i < this.routes.length; i++ ) {
    var route = this.routes[i];
    this.debug('Matching against path=' + route.path);

    // if this hash isn't the same length as this route, then it can't match
    if ( route.segments.length !== segments.length ) {
      this.debug('This hash and route have different path lengths:')
      this.debug(' * route = ' + route.segments.length);
      this.debug(' * hash  = ' + segments.length);
      continue ROUTE;
    }

    // create an array of any matching placeholders
    var args = [];

    // loop through each segment and see if it matches
    SEGMENT: for ( var si = 0; si < route.segments.length; si++ ) {
      // if this is a placeholder, then we always match
      if ( route.segments[si][0] === ':' ) {
        this.debug('Found a route placeholder : ' + segments[si]);
        // push this segments onto args
        args.push(segments[si]);
        // go to next segment
        continue SEGMENT;
      }

      // if this segment doesn't match, then move on to the next route
      if ( segments[si] !== route.segments[si] ) {
        this.debug('Path segment does not match expected:');
        this.debug(' * route = ' + route.segments[si]);
        this.debug(' * hash  = ' + segments[si]);
        continue ROUTE;
      }

      this.debug('Path segment matches - continuing to next segment');
    }

    this.debug('Matched hash=' + hash + ' with path=' + route.path);

    // if we are here, then we matched ok
    matched = true;
    route.fn.apply(null, args);
    break ROUTE;
    // return; // ???
  }

  this.debug('matched=' + matched)

  // see if we matched something, if not, call the notFound route (if available)
  if ( !matched ) {
    this.notFound && this.notFound(normalised);
  }
};

HashiRouter.prototype.setNotFound = function setNotFound(fn) {
  this.notFound = fn;
}

HashiRouter.prototype.debug = function debug(msg) {
  if ( !this.opts.debug ) return;
  console.log('HashiRouter: ' + msg);
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = HashiRouter;

// --------------------------------------------------------------------------------------------------------------------
