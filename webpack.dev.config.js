const { createConfig } = require('@openedx/frontend-build');

const config = createConfig('webpack-dev');

// The stock TinyMCE editor compiles src/index.scss through an inline
// raw-loader!sass-loader; Dart Sass then reports deprecation notices
// (legacy JS API, @import) for the upstream stylesheets. They are not errors,
// so keep them out of the dev overlay.
config.ignoreWarnings = [
  ...(config.ignoreWarnings || []),
  { message: /Deprecation/ },
];

module.exports = config;
