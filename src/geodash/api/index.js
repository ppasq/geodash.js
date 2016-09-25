'use strict';

/**
 * Contains basic access functions and utility functions
 * @namespace api
 * @memberof geodash
 */

module.exports = {
  addBaseLayer: require("./addBaseLayer"),
  addFeatureLayer: require("./addFeatureLayer"),
  arrayToObject: require("./arrayToObject"),
  buildScope: require("./buildScope"),
  clearValue: require("./clearValue"),
  deepCopy: require("./deepCopy"),
  flatten: require("./flatten"),
  getBaseLayer: require("./getBaseLayer"),
  getDashboardConfig: require("./getDashboardConfig"),
  getEndpoint: require("./getEndpoint"),
  getFeatureLayer: require("./getFeatureLayer"),
  getLayer: require("./getLayer"),
  getOption: require("./getOption"),
  getPage: require("./getPage"),
  getRenderOrder: require("./getRenderOrder"),
  getScope: require("./getScope"),
  hasBaseLayer: require("./hasBaseLayer"),
  hasFeatureLayer: require("./hasFeatureLayer"),
  hasLayer: require("./hasLayer"),
  intend: require("./intend"),
  isVisible: require("./isVisible"),
  listBaseLayers: require("./listBaseLayers"),
  listFeatureLayers: require("./listFeatureLayers"),
  listServers: require("./listServers"),
  listTegolaServers: require("./listTegolaServers"),
  listWMSServers: require("./listWMSServers"),
  opt_b: require("./opt_b"),
  opt_i: require("./opt_i"),
  opt_j: require("./opt_j"),
  opt_s: require("./opt_s"),
  opt: require("./opt"),
  parseTrue: require("./parseTrue"),
  setValue: require("./setValue"),
  unpack: require("./unpack"),
  updateValue: require("./updateValue"),
  welcome: require("./welcome")
};
