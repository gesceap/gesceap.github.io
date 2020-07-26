const path = require("path");
const PrerenderSpaPlugin = require("prerender-spa-plugin");

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, "../", ""),
    routes: ["/", "/prime16"],
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer()
  })
];

module.exports = {
  outputDir: path.resolve(path.join(__dirname, "../")),

  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(...productionPlugins);
    }
  }
};
