'use strict';

/**
 * Functions to create feature layers
 * @namespace featurelayer
 * @memberof geodash.layers
 */

module.exports = {
  geojson: require("./geojson"),
  heatmap: require("./heatmap"),
  tegola: require("./tegola"),
  wms: require("./wms"),
  wmts: require("./wmts")
};
