'use strict';
/*global require, window, console, jQuery, $, angular, Bloodhound, location */

var buildPageURL = function($interpolate, dashboard, state)
{
  var template = geodash.api.getPage(extract("page", state));
  if(angular.isDefined(template))
  {
    //
    var url = $interpolate(template)(state);

    var hash_args = [];
    var view = state["view"];
    if(view != undefined && view["z"] != undefined && view["lat"] != undefined && view["lon"] != undefined)
    {
      hash_args.push("z="+view["z"]);
      hash_args.push("lat="+view["lat"].toFixed(4));
      hash_args.push("lon="+view["lon"].toFixed(4));
    }
    var filters = state["filters"];
    if(filters)
    {
        $.each(state["filters"], function(layer_id, layer_filters)
        {
          $.each(layer_filters, function(filter_id, filter_value)
          {
              hash_args.push(layer_id+":"+filter_id+"="+filter_value);
          });
        });
    }
    if(hash_args.length > 0)
    {
      url += "#"+hash_args.join("&");
    }
    return url;
  }
  else
  {
    return undefined;
  }
};

var expand = require("geodash-expand");
var extract = require("geodash-extract");

var extractFloat = function(keyChain, node, fallback)
{
  return geodash.normalize.float(extract(keyChain, node, fallback));
};

var extractArrayLength = function(keyChain, node, fallback)
{
  var value = extract(keyChain, node, undefined);
  return Array.isArray(value) ? value.length : fallback;
};
var getHashValueAsStringArray = function(keys)
{
  return geodash.util.getHashValue(keys, "stringarray");
};
var getHashValueAsInteger = function(keys)
{
  return geodash.util.getHashValue(keys, "integer");
};
var getHashValueAsIntegerArray = function(keys)
{
  return geodash.util.getHashValue(keys, "integerarray");
};
var getHashValueAsFloat = function(keys)
{
  return geodash.util.getHashValue(keys, "float");
};
var sortLayers = function(layers, reverse)
{
  var renderLayers = $.isArray(layers) ? layers : $.map(layers, function(layer){return layer;});
  renderLayers = renderLayers.sort(function(a, b){ return a.get('zIndex') - b.get('zIndex'); });
  if(reverse === true)
    renderLayers.reverse();
  return renderLayers;
};
var updateRenderOrder = function(layers)
{
  if(geodash.mapping_library == "ol3")
  {

  }
  else if(geodash.mapping_library == "leaflet")
  {
    for(var i = 0; i < layers.length; i++)
    {
        layers[i].bringToFront();
    }
  }
};
var layersAsArray = function(layers)
{
  return $.map(layers, function(layer, id){return {'id':id, 'layer':layer};});
};


window.buildPageURL = buildPageURL;
window.expand = expand;
window.extract = extract;
window.extractFloat = extractFloat;
window.extractArrayLength = extractArrayLength;
window.getHashValueAsStringArray = getHashValueAsStringArray;
window.getHashValueAsInteger = getHashValueAsInteger;
window.getHashValueAsIntegerArray = getHashValueAsIntegerArray;
window.getHashValueAsFloat = getHashValueAsFloat;
window.sortLayers = sortLayers;
window.updateRenderOrder = updateRenderOrder;
window.layersAsArray = layersAsArray;
window.geodash = require("./geodash");
