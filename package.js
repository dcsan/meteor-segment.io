Package.describe({
  summary: "Segment.io integration for Meteor (works on both client and server)",
  version: "4.0.0",
  name: "dcsan:segment.io",
  git: "https://github.com/dcsan/meteor-segment.io.git"
});

Npm.depends({
  "analytics-node": "1.1.0"
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@1.0');
  api.addFiles('snippet.js', 'client');
  api.addFiles('server.js', 'server');
  api.export('analytics');
  console.log("-- api.use segment io ")
});
