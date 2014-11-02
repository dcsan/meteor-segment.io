# Segment.io integration for Meteor

*Works on client and server.*

#### Client

The segment.io snippet is copied almost verbatim from the [docs](https://segment.io/docs/tutorials/quickstart-analytics.js/), however, `analytics` is exposed via the Meteor package rather than `window`.

Snippet version is `2.0.9`.

at time of writing, 4.0.0 is latest version of this package so install with:

    meteor add dcsan:segmentio

> (fork of percolate:segmentio)
see [this issue](https://github.com/percolatestudio/meteor-segment.io/issues/6)

#### Server

Using official `analytics-node` npm module.

## Usage

> Almost all the apis are available on both client and server

The un-inited `analytics` object is available for use as per normal.

First, initialize analytics:

```
analytics.load(YOUR_KEY);
```

Then, you could send a `pageview` from IronRouter:

```
Router.onRun(function() {
  analytics.page();
});
```

To `identify` the user, you'd setup an autorun:

```
Meteor.startup(function() {
  Deps.autorun(function(c) {
    // waiting for user subscription to load
    if (! Router.current() || ! Router.current().ready())
      return;

    var user = Meteor.user();
    if (! user)
      return;

    analytics.identify(user._id, {
      name: user.profile.name,
      email: user.emails[0].address
    });

    c.stop();
  });
});
```

Aliasing anonymous users to a registered user when their account is created:

```
Accounts.createUser({
  email: email,
  password: password,
  profile: {
    name: name
  }
}, function(error) {
  if (! error) {
    analytics.alias(Meteor.userId());
  } else {
    alert('Error creating account!\n' + EJSON.stringify(error));
  }
});
```

Tracking an event is as simple as:

```
analytics.track('Purchased T-Shirt', {
  name: 'The Cake is a Liar',
  revenue: 14.99
});
```
