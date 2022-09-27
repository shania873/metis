var Encore = require("@symfony/webpack-encore");

// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}
Encore.addStyleEntry("global", "./assets/styles/app.scss");
Encore.enableSassLoader();
Encore
  // directory where compiled assets will be stored
  .setOutputPath("public/build/")
  // public path used by the web server to access the output path
  .setPublicPath("/build")
  .enableReactPreset()
  // only needed for CDN's or sub-directory deploy
  //.setManifestKeyPrefix('build/')
  // .addStyleEntry("some_page", "./assets/styles/some_page.css")
  /*
   * ENTRY CONFIG
   *
   * Add 1 entry for each "page" of your app
   * (including one that's included on every page - e.g. "app")
   *
   * Each entry will result in one JavaScript file (e.g. app.js)
   * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
   */
  .addEntry("app", "./assets/index.js")

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  .splitEntryChunks()

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .enableSingleRuntimeChunk()

  .copyFiles({
    from: "./assets/images",

    // optional target path, relative to the output dir
    to: "images/[path][name].[ext]",
  })


    // if you want to keep using `file-loader`
    .configureLoaderRule('images', rule => {
      rule.options.esModule = false;
  })

  // OR if you want to use `url-loader`
  .configureUrlLoader({
    images: {
      esModule: false
    }
  });
  /*
   * FEATURE CONFIG
   *
   * Enable & configure other features below. For a full
   * list of features, see:
   * https://symfony.com/doc/current/frontend.html#adding-more-features
   */
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()

  .enableSourceMaps(!Encore.isProduction())
  // enables hashed filenames (e.g. app.abc123.css)
  .enableVersioning(Encore.isProduction())

  // enables @babel/preset-env polyfills
  .configureBabel(() => {}, {
    useBuiltIns: "usage",
    corejs: 3,
  });

module.exports = Encore.getWebpackConfig();
