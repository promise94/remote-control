const { override } = require("customize-cra");

function addRendererWebpackConfig(config) {
  config.target = "electron-renderer";

  return config;
}

module.exports = override(addRendererWebpackConfig);
