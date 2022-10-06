// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  experimental: {
    /**
     * Enable `superjson` experimental support for swc.
     */
    swcPlugins: [
      [
        "next-superjson-plugin", {},
      ],
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
    widenClientFileUpload: true,
    autoInstrumentServerFunctions: true,

    // Disable SentryWebpackPlugin so that the project can build without Sentry CLI token
    disableClientWebpackPlugin: true,
    disableServerWebpackPlugin: true,
  },
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports);
