(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(event, args)
{
  var mainScope = geodash.api.getScope("geodash-main");
  //
  var id = args["id_target"] || args["id_show"] || args["id"];
  var sourceScope = event.targetScope;
  var scope_new = {
    "state": mainScope.state,
    "meta": geodash.meta
  };
  if(angular.isDefined(args))
  {
    if("static" in args)
    {
      scope_new = $.extend(scope_new, args["static"]);
    }
    if("dynamic" in args)
    {
      $.each(args["dynamic"],function(key, value){
        if(angular.isString(value))
        {
          if(value == "map_config")
          {
            scope_new[key] = mainScope.map_config;
          }
          else if(value == "state")
          {
            scope_new[key] = mainScope.state;
          }
        }
        else if(angular.isArray(value))
        {
          var value_0_lc = value[0].toLowerCase();
          if(value_0_lc == "source")
          {
            scope_new[key] = extract(expand(value.slice(1)), event.targetScope);
          }
          else if(value_0_lc == "baselayer" || value_0_lc == "bl")
          {
              scope_new[key] = geodash.api.getBaseLayer(value[1]) || undefined;
          }
          else if(value_0_lc == "featurelayer" || value_0_lc == "fl")
          {
              scope_new[key] = geodash.api.getFeatureLayer(value[1]) || undefined;
          }
          else
          {
            if(value_0_lc == "map_config")
            {
              scope_new[key] = extract(expand(value.slice(1)), mainScope.map_config);
            }
            else if(value_0_lc == "state")
            {
              scope_new[key] = extract(expand(value.slice(1)), mainScope.state);
            }
          }
        }
        else
        {
          scope_new[key] = value;
        }
      });
    }
  }
  return $.extend(true, {}, scope_new);  // Returns a deep copy of variables
};

},{}],2:[function(require,module,exports){
module.exports = function(obj, prefix)
{
  var newObject = {};
  $.each(obj, function(key, value){
    var newKey = prefix != undefined ? prefix+"__"+key : key;
    if(
      (value === undefined) ||
      (value === null) ||
      angular.isString(value) ||
      angular.isNumber(value) ||
      (typeof value == "boolean")
    )
    {
      newObject[newKey] = value;
    }
    else if(angular.isArray(value))
    {
      $.each(geodash.api.flatten(value, newKey), function(key2, value2){
        newObject[""+key2] = value2;
      });
    }
    else
    {
      $.each(geodash.api.flatten(value, newKey), function(key2, value2){
        newObject[key2] = value2;
      });
    }
  });
  return newObject;
};

},{}],3:[function(require,module,exports){
module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.api.getLayer(id, config.baselayers);
};

},{}],4:[function(require,module,exports){
module.exports = function(options)
{
  var scope = geodash.api.getOption(options, '$scope') ||
    geodash.api.getOption(options, 'scope') ||
    geodash.api.getScope("geodash-main");
  return scope.map_config;
};

},{}],5:[function(require,module,exports){
module.exports = function(name)
{
  return geodash.initial_data.data.endpoints[name];
};

},{}],6:[function(require,module,exports){
module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.api.getLayer(id, config.featurelayers);
};

},{}],7:[function(require,module,exports){
module.exports = function(id, layers)
{
  var layer = undefined;
  var matches = $.grep(layers, function(x, i){ return x.id == id; });
  if(matches.length == 1)
  {
    layer = matches[0];
  }
  return layer;
};

},{}],8:[function(require,module,exports){
module.exports = function(options, name)
{
  if(options != undefined && options != null)
  {
    return options[name];
  }
  else
  {
    return undefined;
  }
};

},{}],9:[function(require,module,exports){
module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  var matches = $.grep(config.pages, function(x, i){return x.id == id;});
  if(matches.length == 1)
  {
    return matches[0]["url"];
  }
  else
  {
    return undefined;
  }
};

},{}],10:[function(require,module,exports){
module.exports = function(id)
{
  return angular.element("#"+id).isolateScope() || angular.element("#"+id).scope();
};

},{}],11:[function(require,module,exports){
module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.api.hasLayer(id, config.baselayers);
};

},{}],12:[function(require,module,exports){
module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.api.hasLayer(id, config.featurelayers);
};

},{}],13:[function(require,module,exports){
module.exports = function(id, layers)
{
  var layer = undefined;
  var matches = $.grep(layers, function(x, i){ return x.id == id; });
  return matches.length == 1;
};

},{}],14:[function(require,module,exports){
'use strict';
//var getScope = require("./getScope");
module.exports = {
  buildScope: require("./buildScope"),
  flatten: require("./flatten"),
  getBaseLayer: require("./getBaseLayer"),
  getDashboardConfig: require("./getDashboardConfig"),
  getEndpoint: require("./getEndpoint"),
  getFeatureLayer: require("./getFeatureLayer"),
  getLayer: require("./getLayer"),
  getOption: require("./getOption"),
  getPage: require("./getPage"),
  getScope: require("./getScope"),
  hasBaseLayer: require("./hasBaseLayer"),
  hasFeatureLayer: require("./hasFeatureLayer"),
  hasLayer: require("./hasLayer"),
  intend: require("./intend"),
  listBaseLayers: require("./listBaseLayers"),
  listFeatureLayers: require("./listFeatureLayers"),
  normalize_feature: require("./normalize_feature"),
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

},{"./buildScope":1,"./flatten":2,"./getBaseLayer":3,"./getDashboardConfig":4,"./getEndpoint":5,"./getFeatureLayer":6,"./getLayer":7,"./getOption":8,"./getPage":9,"./getScope":10,"./hasBaseLayer":11,"./hasFeatureLayer":12,"./hasLayer":13,"./intend":15,"./listBaseLayers":16,"./listFeatureLayers":17,"./normalize_feature":18,"./opt":19,"./opt_b":20,"./opt_i":21,"./opt_j":22,"./opt_s":23,"./parseTrue":24,"./setValue":25,"./unpack":26,"./updateValue":27,"./welcome":28}],15:[function(require,module,exports){
/**
 * Used for intents (requesting and action), such as opening modals, zooming the map, etc.
 * @param {string} name of the intent (toggleModal, refreshMap, filterChanged)
 * @param {object} JSON package for intent
 * @param {object} Angular Scope object for emiting the event up the DOM.  This should correspond to an element's paranet controller.
*/
module.exports = function(name, data, scope)
{
  scope.$emit(name, data);
};

},{}],16:[function(require,module,exports){
module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  return extract("baselayers", config, []);
};

},{}],17:[function(require,module,exports){
module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  return extract("featurelayers", config, []);
};

},{}],18:[function(require,module,exports){
module.exports = function(feature)
{
  var feature = {
    'attributes': feature.attributes || feature.properties,
    'geometry': feature.geometry
  };
  return feature;
};

},{}],19:[function(require,module,exports){
module.exports = function(options, names, fallback, fallback2)
{
  if(options != undefined)
  {
    if($.isArray(names))
    {
      var value = undefined;
      for(var i = 0; i < names.length; i++)
      {
        value = options[names[i]];
        if(value != undefined)
            break;
      }
      return value || fallback || fallback2;
    }
    else
        return options[names] || fallback ||  fallback2;
  }
  else
      return fallback || fallback2;
};

},{}],20:[function(require,module,exports){
module.exports = function(options, names, fallback)
{
  return geodash.api.opt(options, names, fallback, false);
};

},{}],21:[function(require,module,exports){
module.exports = function(options, names, fallback)
{
  return geodash.api.opt(options, names, fallback, 0);
};

},{}],22:[function(require,module,exports){
module.exports = function(options, names, fallback)
{
  return geodash.api.opt(options, names, fallback, {});
};

},{}],23:[function(require,module,exports){
module.exports = function(options, names, fallback)
{
  return geodash.api.opt(options, names, fallback, "");
};

},{}],24:[function(require,module,exports){
module.exports = function(name)
{
  return ['on', 'true', 't', '1', 1, true].indexOf(value) != -1;
};

},{}],25:[function(require,module,exports){
module.exports = function(field_flat, value, target)
{
  // Update map_config
  if(field_flat.indexOf("__") == -1)
  {
    target[field_flat] = value;
  }
  else
  {
    var keyChain = field_flat.split("__");
    for(var j = 0; j < keyChain.length -1 ; j++)
    {
      var newKey = keyChain[j];
      if(!(newKey in target))
      {
        var iTest = -1;
        try{iTest = parseInt(keyChain[j+1], 10);}catch(err){iTest = -1;};
        target[newKey] = iTest >= 0 ? [] : {};
      }
      target = target[newKey];
    }
    var finalKey = keyChain[keyChain.length-1];
    if(angular.isArray(target))
    {
      if(finalKey >= target.length)
      {
        var zeros = finalKey - target.length;
        for(var k = 0; k < zeros; k++ )
        {
          target.push({});
        }
        target.push(value);
      }
    }
    else
    {
      target[finalKey] = value;
    }
  }
};

},{}],26:[function(require,module,exports){
module.exports = function(obj)
{
  var newObject = {};
  $.each(obj, function(key, value){
    if(key.indexOf("__") == -1)
    {
      newObject[key] = value;
    }
    else
    {
      var keyChain = key.split("__");
      var target = obj;
      for(var j = 0; j < keyChain.length; j++)
      {
        var newKey = keyChain[j];
        if(!(newKey in target))
        {
          target[newKey] = {};
        }
        target = target[newKey];
      }
      target[keyChain[keyChain.length-1]] = value;
    }
  });
  return newObject;
};

},{}],27:[function(require,module,exports){
module.exports = function(field_flat, source, target)
{
  // Update map_config
  if(field_flat.indexOf("__") == -1)
  {
    target[field_flat] = source[field_flat];
  }
  else
  {
    var keyChain = field_flat.split("__");
    for(var j = 0; j < keyChain.length -1 ; j++)
    {
      var newKey = keyChain[j];
      if(!(newKey in target))
      {
        var iTest = -1;
        try{iTest = parseInt(keyChain[j+1], 10);}catch(err){iTest = -1;};
        target[newKey] = iTest >= 0 ? [] : {};
      }
      target = target[newKey];
    }
    var finalKey = keyChain[keyChain.length-1];
    if(angular.isArray(target))
    {
      if(finalKey >= target.length)
      {
        var zeros = finalKey - target.length;
        for(var k = 0; k < zeros; k++ )
        {
          target.push({});
        }
        target.push(source[field_flat]);
      }
    }
    else
    {
      target[finalKey] = source[field_flat];
    }
  }
};

},{}],28:[function(require,module,exports){
module.exports = function(options)
{
  options = options || {};
  var scope = options['$scope'] || options['scope'] || angular.element("#geodash-main").scope();
  var intentData = {
    "id": "geodash-modal-welcome",
    "dynamic": {},
    "static": {
      "welcome": scope.map_config["welcome"]
    }
  };
  geodash.api.intend("toggleModal", intentData, scope);
};

},{}],29:[function(require,module,exports){
module.exports = function(x, length, fallback)
{
  if(x === undefined || x === "")
  {
    return fallback;
  }
  else if(angular.isString(x))
  {
    x = x.split(",");
    if(x.length == length)
    {
      return x;
    }
    else
    {
      return fallback;
    }
  }
  else if(angular.isArray(x))
  {
    if(x.length == length)
    {
      return x;
    }
    else
    {
      return fallback;
    }
  }
};

},{}],30:[function(require,module,exports){
module.exports = function(x, fallback)
{
  if(x === undefined || x === "")
  {
    return fallback;
  }
  else if(angular.isNumber(x))
  {
    return x;
  }
  else
  {
    return parseFloat(x);
  }
};

},{}],31:[function(require,module,exports){
'use strict';
module.exports = {
  float: require("./float"),
  array_length: require("./array_length")
};

},{"./array_length":29,"./float":30}],32:[function(require,module,exports){
module.exports = function(path, obj, fallback)
{
  var result = fallback || '';
  var x = extract(path, obj);
  if(Array.isArray(x))
  {
    result = x.join(",");
  }
  else if(angular.isString(x))
  {
    result = x;
  }
  return result;
};

},{}],33:[function(require,module,exports){
'use strict';
module.exports = {
  formatArray: require("./formatArray"),
  parseAttributes: require("./parseAttributes"),
  parseFeatures: require("./parseFeatures"),
  parseGeometry: require("./parseGeometry")
};

},{"./formatArray":32,"./parseAttributes":34,"./parseFeatures":35,"./parseGeometry":36}],34:[function(require,module,exports){
module.exports = function(element, fields)
{
  var attributes = {};
  if(fields != undefined)
  {
    for(var k = 0; k < fields.length; k++)
    {
      var field = fields[k];
      var attributeName = field['output'] || field['attribute'];
      attributes[attributeName] = undefined;
      var inputName = field['attribute'] || field['input'];
      var inputNames = inputName != undefined ? [inputName] : field['inputs'];
      if(inputNames!= undefined)
      {
        for(var l = 0; l < inputNames.length; l++)
        {
          var inputName = inputNames[l];
          if(element.find("geonode\\:"+inputName).length > 0)
          {
            attributes[attributeName] = element.find("geonode\\:"+inputName).text();
            break;
          }
        }
      }
    }
  }
  return attributes;
};

},{}],35:[function(require,module,exports){
module.exports = function(response, fields_by_featuretype)
{
  var features = [];
  //$(response).find("FeatureCollection")  No need to search for featurecollection.  It IS the featurecollection
  $(response).find('gml\\:featuremember').each(function(){
      //var f = $(this).find(typeName.indexOf(":") != -1 ? typeName.substring(typeName.indexOf(":") + 1) : typeName);
      var f = $(this).children();
      var typeName = f.prop("tagName").toLowerCase();
      var attributes = geodash.codec.parseAttributes(f, fields_by_featuretype[typeName]);
      var geom = geodash.codec.parseGeometry(f);
      var newFeature = {
        'featuretype': typeName,
        'attributes': attributes,
        'geometry': geom
      };
      features.push(newFeature);
  });
  return features;
};

},{}],36:[function(require,module,exports){
module.exports = function(element)
{
  var geom = undefined;

  var attribute = element.find("geonode\\:shape");
  if(attribute.length == 0){ attribute = element.find("geonode\\:the_geom"); }

  if(attribute.find("gml\\:point").length > 0)
  {
    var coords = attribute.find("gml\\:point").find("gml\\:coordinates").text().split(",");
    geom = new L.LatLng(parseFloat(coords[1]), parseFloat(coords[0]));
  }
  else if(attribute.find("gml\\:multilinestring").length > 0)
  {
    var coords = attribute.find("gml\\:multilinestring")
      .find("gml\\:linestringmember")
      .find("gml\\:linestring")
      .find("gml\\:coordinates")
      .text().split(" ");
    coords = $.map(coords, function(x, i){
      var a = x.split(",");
      return [[parseFloat(a[0]), parseFloat(a[1])]];
    });
    var geojson = [{"type": "LineString","coordinates": coords}];
    geom = new L.GeoJSON(geojson, {});
  }
  else if(attribute.find("gml\\:multipolygon").length > 0)
  {
    var coords = attribute.find("gml\\:multipolygon")
      .find("gml\\:polygonmember")
      .find("gml\\:polygon")
      .find("gml\\:outerboundaryis")
      .find("gml\\:linearring")
      .find("gml\\:coordinates")
      .text().split(" ");
    coords = $.map(coords, function(x, i){
      var a = x.split(",");
      return [[parseFloat(a[0]), parseFloat(a[1])]];
    });
    var ring = [coords];
    var multipolygon = [ring];
    var geojson = [{
      "type": "MultiPolygon",
      "coordinates": multipolygon
    }];
    geom = new L.GeoJSON(geojson, {});
  }
  return geom;
};

},{}],37:[function(require,module,exports){
module.exports = function(responses, fields_by_featuretype)
{
  var features = [];
  for(var i = 0; i < responses.length; i++)
  {
    var response = responses[i];
    if(response.status == 200)
    {
      var data = response.data;
      features = features.concat(geodash.codec.parseFeatures(data, fields_by_featuretype));
    }
  }
  return features;
};

},{}],38:[function(require,module,exports){
module.exports = function($http, urls)
{
  var promises = [];
  for(var i = 0; i < urls.length; i++)
  {
    var url = urls[i];
    var config = {};
    var promise = $http.get(url, config);
    promises.push(promise);
  }
  return promises;
};

},{}],39:[function(require,module,exports){
'use strict';
module.exports = {
  build_promises: require("./build_promises"),
  build_features: require("./build_features")
};

},{"./build_features":37,"./build_promises":38}],40:[function(require,module,exports){
'use strict';
module.exports = {
  api: require("./api"),
  assert: require("./assert"),
  codec: require("./codec"),
  http: require("./http"),
  controllers: {},
  directives: {},
  filters: {},
  handlers: {},
  init: require("./init"),
  layers: require("./layers"),
  listeners: require("./listeners"),
  popup: require("./popup"),
  tilemath: require("./tilemath"),
  ui: require("./ui"),
  vecmath: require("./vecmath")
};

},{"./api":14,"./assert":31,"./codec":33,"./http":39,"./init":46,"./layers":54,"./listeners":65,"./popup":74,"./tilemath":76,"./ui":82,"./vecmath":91}],41:[function(require,module,exports){
module.exports = function(that, app, controller)
{
  var controllerName = that.data('controllerName') || that.attr('geodash-controller') || that.attr('name') || that.attr('id');
  if(controllerName == undefined || controllerName == null || controllerName == "")
  {
    console.log("Error: Could not load controller for element, because name could not be resolved");
    console.log(that, controller);
  }
  else
  {
    currentControllers.push({
      'controllerName': controllerName,
      'controller': (controller || geodash.controllers.controller_base)
    });
    app.controller(controllerName, controller || geodash.controllers.GeoDashControllerBase);
  }
};

},{}],42:[function(require,module,exports){
module.exports = function(app)
{
  app.controller("GeoDashControllerBase", geodash.controllers.controller_base);
};

},{}],43:[function(require,module,exports){
module.exports = function(that, app, controllers)
{
  for(var i = 0; i < controllers.length; i++)
  {
    var c = controllers[i];
    $(c.selector, that).each(function(){
        try
        {
          geodash.init.controller($(this), app, c.controller);
        }
        catch(err)
        {
          console.log("Could not load GeoDash Controller \""+c.selector+"\"", err);
        }
    });
  }
};

},{}],44:[function(require,module,exports){
module.exports = function(app)
{
  if(geodash.directives != undefined)
  {
    geodash.meta.directives = [];
    $.each(geodash.directives, function(name, dir){
      geodash.meta.directives.push(name);
      app.directive(name, dir);
    });
  }
};

},{}],45:[function(require,module,exports){
module.exports = function(app)
{
  if(geodash.filters != undefined)
  {
    geodash.meta.filters = [];
    $.each(geodash.filters, function(name, func){
      geodash.meta.filters.push(name);
      app.filter(name, func);
    });
  }
};

},{}],46:[function(require,module,exports){
'use strict';
module.exports = {
  controller_base: require("./controller_base"),
  controller: require("./controller"),
  controllers: require("./controllers"),
  directives: require("./directives"),
  filters: require("./filters"),
  listeners: require("./listeners"),
  map_leaflet: require("./map_leaflet"),
  map_ol3: require("./map_ol3"),
  state: require("./state"),
  templates: require("./templates"),
  typeahead: require("./typeahead")
};

},{"./controller":41,"./controller_base":42,"./controllers":43,"./directives":44,"./filters":45,"./listeners":47,"./map_leaflet":48,"./map_ol3":49,"./state":50,"./templates":51,"./typeahead":52}],47:[function(require,module,exports){
module.exports = function()
{
  $('body').on('click', '.btn-clear', function(event) {
    // "this" doesn't always point to what you think it does,
    // that's why need to use event.currentTarget
    var selector = $(event.currentTarget).attr('data-target');

    try{ $(selector).typeahead('close'); }catch(err){};

    $(selector).each(function(){
      var input = $(this);
      input.val(null);
      // Update Typeahead backend if exists
      if(input.data('backend') != undefined)
      {
        var backend = $('#'+input.data('backend'));
        backend.val(null);
        backend.trigger('input');
        backend.change();
      }
    });
  });
  $('body').on('click', '.btn-off', function(event) {
    var selector = $(event.currentTarget).attr('data-target');
    $(selector).each(function(){
      var input = $(this);
      input.val("false");
      input.trigger('input');
      input.change();
    });
  });
  $('body').on('click', '.btn-on', function(event) {
    var selector = $(event.currentTarget).attr('data-target');
    $(selector).each(function(){
      var input = $(this);
      input.val("true");
      input.trigger('input');
      input.change();
    });
  });

  $('body').on('click', '.geodash-intent', function(event) {
    event.preventDefault();  // For anchor tags
    var that = $(this);
    //var scope = angular.element('[ng-controller='+that.data('intent-ctrl')+']').scope();
    var scope = geodash.api.getScope(that.attr('data-intent-ctrl'));
    if(that.hasClass('geodash-toggle'))
    {
      var intentData = JSON.parse(that.attr('data-intent-data')); // b/c jquery data not updated by angular
      if(that.hasClass('geodash-off'))
      {
        that.removeClass('geodash-off');
        geodash.api.intend(that.attr('data-intent-names')[0], intentData, scope);
      }
      else
      {
        that.addClass('geodash-off');
        geodash.api.intend(that.attr('data-intent-names')[1], intentData, scope);
      }
    }
    else if(that.hasClass('geodash-radio'))
    {
      var siblings = that.parents('.geodash-radio-group:first').find(".geodash-radio").not(that);
      if(!(that.hasClass('geodash-on')))
      {
        that.addClass('geodash-on');
        if(that.data("intent-class-on"))
        {
          that.addClass(that.data("intent-class-on"));
          siblings.removeClass(that.data("intent-class-on"));
        }
        siblings.removeClass('geodash-on');
        if(that.data("intent-class-off"))
        {
          that.removeClass(that.data("intent-class-off"));
          siblings.addClass(that.data("intent-class-off"));
        }
        var intentName = that.attr('data-intent-name');
        var intentData = JSON.parse(that.attr('data-intent-data')); // b/c jquery data not updated by angular
        geodash.api.intend(intentName, intentData, scope);
      }
    }
    else
    {
      var intentName = that.attr('data-intent-name');
      var intentData = JSON.parse(that.attr('data-intent-data'));
      geodash.api.intend(intentName, intentData, scope);
    }
  });
};

},{}],48:[function(require,module,exports){
module.exports = function(opts)
{
  var map = L.map('map',
  {
    attributionControl: geodash.api.opt_b(opts, "attributionControl", false),
    zoomControl: geodash.api.opt_b(opts, "zoomControl", false),
    minZoom: geodash.api.opt_i(opts, "minZoom", 3),
    maxZoom: geodash.api.opt_i(opts, "maxZoom", 18)
  });

  map.setView(
    [geodash.api.opt_i(opts,["latitude", "lat"],0), geodash.api.opt_i(opts,["longitude", "lon", "lng", "long"], 0)],
    geodash.api.opt_i(opts, ["zoom", "z"], 0));

  $.each(geodash.api.opt_j(opts, "listeners"), function(e, f){
    map.on(e, f);
  });

  return map;
};

},{}],49:[function(require,module,exports){
module.exports = function(opts)
{
  var lonlat = [
    geodash.api.opt_i(opts,["longitude", "lon", "lng", "long"], 0),
    geodash.api.opt_i(opts,["latitude", "lat"], 0)];
  var zoom = geodash.api.opt_i(opts, ["zoom", "z"], 0);

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat(lonlat),
      zoom: zoom,
      minZoom: geodash.api.opt_i(opts, "minZoom", 3),
      maxZoom: geodash.api.opt_i(opts, "maxZoom", 18)
    })
  });
  //var map = ol.Map('map',
  //{
  //  attributionControl: geodash.api.opt_b(opts, "attributionControl", false),
  //  zoomControl: geodash.api.opt_b(opts, "zoomControl", false),
  //});

  $.each(geodash.api.opt_j(opts, "listeners"), function(e, f){
    map.on(e, f);
  });

  return map;
};

},{}],50:[function(require,module,exports){
/**
 * init_state will overwrite the default state from the server with params in the url.
 * @param {Object} state - Initial state from server
 */
module.exports = function(state, stateschema)
{
  var newState = $.extend({}, state);

  // Update View
  var lat = getHashValueAsFloat(["latitude", "lat", "y"]) || state["lat"] || 0.0;
  var lon = getHashValueAsFloat(["longitude", "lon", "long", "lng", "x"]) || state["lon"] || 0.0;
  var z = getHashValueAsInteger(["zoom", "z"]) || state["z"] || 3;
  var delta = {'lat': lat, 'lon': lon, 'z': z};
  newState["view"] = newState["view"] != undefined ? $.extend(newState["view"], delta) : delta;

  // Update Filters
  if(newState["filters"] != undefined)
  {
    $.each(newState["filters"], function(layer_id, layer_filters){
      $.each(layer_filters, function(filter_id, filer_value){
        var type = stateschema["filters"][layer_id][filter_id].toLowerCase();
        var value = getHashValue(layer_id+":"+filter_id, type);
        if(value != undefined && value != "")
        {
          newState["filters"][layer_id][filter_id] = value;
        }
      });
    });
  }

  // Update Filters
  if(newState["styles"] != undefined)
  {
    /*
    $.each(newState["styles"], function(layer_id, layer_style){
      var type = stateschema["filters"][layer_id][filter_id].toLowerCase();
      var value = getHashValue("style:"+layer_id, type);
      if(value != undefined && value != "")
      {
        newState["filters"][layer_id][filter_id] = value;
      }
    });*/
  }

  return newState;
};

},{}],51:[function(require,module,exports){
module.exports = function(app)
{
  if(geodash.templates != undefined)
  {
    geodash.meta.templates = [];
    $.each(geodash.templates, function(name, template){
      geodash.meta.templates.push(name);
      app.run(function($templateCache){$templateCache.put(name,template);});
    });
  }
};

},{}],52:[function(require,module,exports){
module.exports = function($element, featurelayers, baselayers)
{
  $('.typeahead', $element).each(function(){
    var s = $(this);
    var placeholder = s.data('placeholder');
    var initialData = s.data('initialData');
    var w = s.data('width');
    var h = s.data('height');
    var css = 'geodashserver-welcome-select-dropdown';
    var template_empty = s.data('template-empty');
    var template_suggestion = s.data('template-suggestion');

    var bloodhoundData = [];
    if(angular.isString(initialData))
    {
      if(initialData == "layers")
      {
        bloodhoundData = [];
        featurelayers = featurelayers || geodash.api.listFeatureLayers();
        //angular.element("#geodash-main").scope()["map_config"]["featurelayers"];
        if(featurelayers != undefined)
        {
          bloodhoundData = bloodhoundData.concat($.map(featurelayers, function(x, i){
            return {'id': x.id, 'text': x.id};
          }));
        }
        baselayers = baselayers || geodash.api.listBaseLayers();
        //angular.element("#geodash-main").scope()["map_config"]["baselayers"];
        if(baselayers != undefined)
        {
          bloodhoundData = bloodhoundData.concat($.map(baselayers, function(x, i){
            return {'id': x.id, 'text': x.id};
          }));
        }
      }
      else if(initialData == "featurelayers")
      {
        featurelayers = featurelayers || geodash.api.listFeatureLayers();
        bloodhoundData = $.map(featurelayers, function(fl, id){ return {'id': id, 'text': id}; });
      }
      else if(initialData == "baselayers")
      {
        baselayers = baselayers || geodash.api.listBaseLayers();
        bloodhoundData = $.map(baselayers, function(bl, id){ return {'id': id, 'text': id}; });
      }
      else if(initialData.length > 0)
      {
        bloodhoundData = [].concat(geodash.initial_data["data"][initialData]);
        for(var i = 0; i < bloodhoundData.length; i++)
        {
          if(angular.isString(bloodhoundData[i]))
          {
            bloodhoundData[i] = {'id': bloodhoundData[i], 'text': bloodhoundData[i]};
          }
        }
      }
    }
    else if(Array.isArray(initialData))
    {
      bloodhoundData = [].concat(initialData);
      for(var i = 0; i < bloodhoundData.length; i++)
      {
        if(angular.isString(bloodhoundData[i]))
        {
          bloodhoundData[i] = {'id': bloodhoundData[i], 'text': bloodhoundData[i]};
        }
      }
      //bloodhoundData = $.map(initialData, function(x, i){ return {'id': x, 'text': x}; });
    }

    if(angular.isDefined(bloodhoundData) && bloodhoundData.length > 0)
    {
      bloodhoundData.sort(function(a, b){
        var textA = a.text.toLowerCase();
        var textB = b.text.toLowerCase();
        if(textA < textB){ return -1; }
        else if(textA > textB){ return 1; }
        else { return 0; }
      });

      // Twitter Typeahead with
      //https://github.com/bassjobsen/typeahead.js-bootstrap-css
      var engine = new Bloodhound({
        identify: function(obj) {
          return obj['text'];
        },
        datumTokenizer: function(d) {
          return Bloodhound.tokenizers.whitespace(d.text);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: bloodhoundData
      });

      s.data('engine', engine);
      s.typeahead('destroy','NoCached');
      s.typeahead(null, {
        name: s.attr('name'),
        minLength: 0,
        limit: 10,
        hint: false,
        highlight: true,
        displayKey: 'text',
        source: function (query, cb)
        {
          // https://github.com/twitter/typeahead.js/pull/719#issuecomment-43083651
          // http://pastebin.com/adWHFupF
          //query == "" ? cb(data) : engine.ttAdapter()(query, cb);
          engine.ttAdapter()(query, cb);
        },
        templates: {
          empty: template_empty,
          suggestion: function (data) {
              return '<p><strong>' + data.text + '</strong> - ' + data.id + '</p>';
          },
          footer: function (data) {
            return '<div>Searched for <strong>' + data.query + '</strong></div>';
          }
        }
      }).on('blur', function(event) {
        var results = engine.get($(this).val());
        var backend = $('#'+$(this).data('backend'))
          .val(results.length == 1 ? results[0]['id'] : null)
          .trigger('input')
          .change();
      })
      .on('typeahead:change', function(event, value) {
        console.log("Event: ", event, value);
        var results = engine.get(value);
        var backend = $('#'+$(this).data('backend'))
          .val(results.length == 1 ? results[0]['id'] : null)
          .trigger('input')
          .change();
      })
      .on('typeahead:select typeahead:autocomplete typeahead:cursorchange', function(event, obj) {
        console.log("Event: ", event, obj);
        var backend = $('#'+$(this).data('backend'))
          .val(extract("id", obj, null))
          .trigger('input')
          .change();
      });
    }

  });

};

},{}],53:[function(require,module,exports){
module.exports = function(featureLayer)
{
  var fields = [];
  var panes = extract("popup.panes", featureLayer, undefined);
  if(panes != undefined)
  {
    for(var i = 0; i < panes.length; i++)
    {
      fields = fields.concat(panes[i].fields);
    }
  }
  return fields;
};

},{}],54:[function(require,module,exports){
'use strict';
module.exports = {
  aggregate_fields: require("./aggregate_fields"),
  init_baselayers_leaflet: require("./init_baselayers_leaflet"),
  init_baselayers_ol3: require("./init_baselayers_ol3"),
  init_featurelayer_post: require("./init_featurelayer_post"),
  init_featurelayer_post_ol3: require("./init_featurelayer_post_ol3"),
  init_featurelayer_wms: require("./init_featurelayer_wms"),
  init_featurelayer_wmts: require("./init_featurelayer_wmts"),
  init_featurelayer_geojson: require("./init_featurelayer_geojson"),
  init_featurelayer: require("./init_featurelayer"),
  init_featurelayers: require("./init_featurelayers")
};

},{"./aggregate_fields":53,"./init_baselayers_leaflet":55,"./init_baselayers_ol3":56,"./init_featurelayer":57,"./init_featurelayer_geojson":58,"./init_featurelayer_post":59,"./init_featurelayer_post_ol3":60,"./init_featurelayer_wms":61,"./init_featurelayer_wmts":62,"./init_featurelayers":63}],55:[function(require,module,exports){
module.exports = function(map, baselayers)
{
  var layers = {};
  for(var i = 0; i < baselayers.length; i++)
  {
      var bl = baselayers[i];
      var type = extract("source.type", bl, 'tile');
      var attribution = extract("source.attribution", bl, undefined);
      var url = undefined;
      if(type.toLowerCase() == "mapbox")
      {
        var mb_layers = extract("source.mapbox.layers", bl, undefined);
        var mb_access_token = extract("source.mapbox.access_token", bl, undefined);
        if(mb_layers == undefined || mb_access_token == undefined)
        {
          console.log("MapBox Layers missing config.", bl);
        }
        else
        {
          url = "http://{s}.tiles.mapbox.com/v4/"+mb_layers+"/{z}/{x}/{y}.png?access_token="+mb_access_token;
        }
      }
      else if(type.toLowerCase() == "gwc")
      {
        var gwc_url = extract("source.gwc.url", bl, undefined);
        var gwc_layers = extract("source.gwc.layers", bl, undefined);
        if(gwc_url == undefined || gwc_layers == undefined)
        {
          console.log("GWC Layers missing config.", bl);
        }
        else
        {
          url = gwc_url+(gwc_url.endsWith("/")?'':'/')+"service/tms/1.0.0/"+gwc_layers+"@EPSG:900913@png/{z}/{x}/{y}.png";
        }
      }
      else if(type.toLowerCase() in ["tile", "tiles"])
      {
        url = extract("source.tile.url", bl, undefined);
      }
      url = url || extract("source.url", bl, undefined);
      try{
        layers[bl.id] = L.tileLayer(url, {
            id: bl.id,
            attribution: attribution
        });
      }catch(err){console.log("Could not add baselayer "+i);}
  }
  return layers;
};

},{}],56:[function(require,module,exports){
module.exports = function(map, baselayers)
{
  var layers = {};
  for(var i = 0; i < baselayers.length; i++)
  {
      var bl = baselayers[i];
      var type = extract("source.type", bl, 'tile');
      var attribution = extract("source.attribution", bl, undefined);
      var url = undefined;
      if(type.toLowerCase() == "mapbox")
      {
        var mb_layers = extract("source.mapbox.layers", bl, undefined);
        var mb_access_token = extract("source.mapbox.access_token", bl, undefined);
        if(mb_layers == undefined || mb_access_token == undefined)
        {
          console.log("MapBox Layers missing config.", bl);
        }
        else
        {
          url = "http://{a-c}.tiles.mapbox.com/v4/"+mb_layers+"/{z}/{x}/{y}.png?access_token="+mb_access_token;
        }
      }
      else if(type.toLowerCase() == "gwc")
      {
        var gwc_url = extract("source.gwc.url", bl, undefined);
        var gwc_layers = extract("source.gwc.layers", bl, undefined);
        if(gwc_url == undefined || gwc_layers == undefined)
        {
          console.log("GWC Layers missing config.", bl);
        }
        else
        {
          url = gwc_url+(gwc_url.endsWith("/")?'':'/')+"service/tms/1.0.0/"+gwc_layers+"@EPSG:900913@png/{z}/{x}/{y}.png";
        }
      }
      else if(type.toLowerCase() in ["tile", "tiles"])
      {
        url = extract("source.tile.url", bl, undefined);
      }
      url = url || extract("source.url", bl, undefined);
      try{
        layers[bl.id] = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: url
          })
        });
        /*layers[bl.id] = L.tileLayer(url, {
            id: bl.id,
            attribution: attribution
        });*/
      }catch(err){console.log("Could not add baselayer "+i);}
  }
  return layers;
};

},{}],57:[function(require,module,exports){
module.exports = function(id, layerConfig, $scope, live, map_config)
{
  if(layerConfig.enabled == undefined || layerConfig.enabled == true)
  {
    var t = extract("type", layerConfig, "").toLowerCase();
    if(t == "geojson")
    {
      geodash.layers.init_featurelayer_geojson($scope, live, map_config, id, layerConfig);
    }
    else if(t == "wms")
    {
      geodash.layers.init_featurelayer_wms($scope, live, map_config, id, layerConfig);
    }
    else if(t == "wmts")
    {
      geodash.layers.init_featurelayer_wmts($scope, live, map_config, id, layerConfig);
    }
  }
};

},{}],58:[function(require,module,exports){
module.exports = function($scope, live, map_config, id, layerConfig)
{
  var url = extract("geojson.url", layerConfig) || extract("source.url", layerConfig) || extract("url", layerConfig);
  $.ajax({
    url: url,
    dataType: "json",
    success: function(response){
      var fl = undefined;
      if(layerConfig.transform == "heatmap")
      {
        var heatLayerData = [];
        var maxIntensity = 0;
        for(var i = 0; i < response[0]["features"].length; i++)
        {
          var intensity = ("attribute" in layerConfig["heatmap"] && layerConfig["heatmap"]["attribute"] != "") ? response[0]["features"][i]["properties"][layerConfig["heatmap"]["attribute"]] : 1.0;
          heatLayerData.push([
            response[0]["features"][i]["geometry"]["coordinates"][1],
            response[0]["features"][i]["geometry"]["coordinates"][0],
            intensity
          ]);
          if(intensity > maxIntensity)
          {
            maxIntensity = intensity;
          }
        }
        for(var i = 0; i < heatLayerData.length; i++)
        {
          heatLayerData[i][2] = heatLayerData[i][2] / maxIntensity;
        }

        var canvas = L.heatCanvas();
        fl = L.heatLayer(heatLayerData, {
          "renderer": canvas,
          "attribution": layerConfig["source"]["attribution"],
          "radius": (layerConfig["heatmap"]["radius"] || 25),
          "blur": (layerConfig["heatmap"]["blur"] || 15),
          "max": (layerConfig["heatmap"]["max"] || 1.0),
          "minOpacity": (layerConfig["heatmap"]["minOpacity"] || 0.5)
        });
      }
      else
      {
        fl = L.geoJson(response, {
          attribution: layerConfig.source.attribution
        });
      }
      live["featurelayers"][id] = fl;
      geodash.layers.init_featurelayer_post($scope, live, id, fl, layerConfig.visible);
    }
  });
};

},{}],59:[function(require,module,exports){
module.exports = function($scope, live, id, fl, visible)
{
  if(fl != undefined)
  {
    if(visible != undefined ? visible : true)
    {
      fl.addTo(live["map"]);
    }
    geodash.api.intend("layerLoaded", {'type':'featurelayer', 'layer': id, 'visible': visible}, $scope);
  }
  else
  {
    console.log("Could not add featurelayer "+id+" because it is undefined.");
  }
};

},{}],60:[function(require,module,exports){
module.exports = function($scope, live, id, fl, visible)
{
  if(fl != undefined)
  {
    if(visible != undefined ? visible : true)
    {
      live["map"].addLayer(fl);
    }
    geodash.api.intend("layerLoaded", {'type':'featurelayer', 'layer': id, 'visible': visible}, $scope);
  }
  else
  {
    console.log("Could not add featurelayer "+id+" because it is undefined.");
  }
};

},{}],61:[function(require,module,exports){
module.exports = function($scope, live, map_config, id, layerConfig)
{
  var w = layerConfig.wms;
  if(extract("auth", layerConfig, "") == "basic")
  {
    var auth_url = w.url + (w.url.indexOf("?") != -1 ? '&' : '?') + "SERVICE=WMS&REQUEST=GetCapabilities"
    $.ajax({
      url: auth_url,
      type: "GET",
      dataType: "jsonp",
      jsonp: "callback",
      beforeSend: function(xhr){
        xhr.setRequestHeader("Authorization", "Basic "+btoa("null:null"));
        console.log(xhr);
      },
      error: function(){},
      success: function(){},
      complete: function(response){
        var params = {
          "LAYERS": geodash.codec.formatArray('layers', w, ''),
          "STYLES": geodash.codec.formatArray('styles', w, ''),
          "buffer": w.buffer || 0,
          "version": w.version || "1.1.1",
          "format": w.format || "image/png",
          transparent: extract('transparent', w, true)
        };
        var cql_filter = extract('cql_filter', w, undefined);
        if(angular.isDefined(cql_filter))
        {
          params["CQL_FILTER"] = cql_filter;
        }
        var options = {
          url: w.url,
          params: params,
          serverType: 'geoserver',
          crossOrigin: 'anonymous'
        };
        var source = new ol.source.ImageWMS(options);
        var fl = new ol.layer.Image({
          source: source
        });
        live["featurelayers"][id] = fl;
        geodash.layers.init_featurelayer_post_ol3($scope, live, id, fl, layerConfig.visible);
      }
    });
  }
  else
  {
    var params = {
      "LAYERS": geodash.codec.formatArray('layers', w, ''),
      "STYLES": geodash.codec.formatArray('styles', w, ''),
      "buffer": w.buffer || 0,
      "version": w.version || "1.1.1",
      "format": w.format || "image/png",
      transparent: extract('transparent', w, true)
    };
    var cql_filter = extract('cql_filter', w, undefined);
    if(angular.isDefined(cql_filter))
    {
      params["CQL_FILTER"] = cql_filter;
    }
    var options = {
      url: w.url,
      params: params,
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    };
    var source = new ol.source.ImageWMS(options);
    var fl = new ol.layer.Image({
      source: source
    });
    live["featurelayers"][id] = fl;
    geodash.layers.init_featurelayer_post_ol3($scope, live, id, fl, layerConfig.visible);
  }
};

},{}],62:[function(require,module,exports){
module.exports = function($scope, live, map_config, id, layerConfig)
{
  var w = layerConfig.wmts;
  if(extract("auth", layerConfig, "") == "basic")
  {
    var auth_url = w.url + (w.url.indexOf("?") != -1 ? '&' : '?') + "SERVICE=WMS&REQUEST=GetCapabilities"
    $.ajax({
      url: auth_url,
      type: "GET",
      dataType: "jsonp",
      jsonp: "callback",
      beforeSend: function(xhr){
        xhr.setRequestHeader("Authorization", "Basic "+btoa("null:null"));
      },
      error: function(){},
      success: function(){},
      complete: function(response){
        var fl = L.tileLayer.wmts(w.url, {
          renderOrder: $.inArray(id, map_config.renderlayers),
          version: w.version || "1.0.0",
          layers: geodash.codec.formatArray('layers', w, ''),
          styles: geodash.codec.formatArray('styles', w, ''),
          format: w.format || 'image/png',
          transparent: angular.isDefined(w.transparent) ? w.transparent : true,
          attribution: extract("source.attribution", layerConfig, undefined),
          tilematrixSet: "EPSG:3857",
          minZoom: extract("view.minZoom", layerConfig, 0),
          maxZoom: extract("view.maxZoom", layerConfig, 18),
          maxNativeZoom: extract("source.maxZoom", layerConfig, null)
        });
        live["featurelayers"][id] = fl;
        geodash.layers.init_featurelayer_post($scope, live, id, fl, layerConfig.visible);
      }
    });
  }
  else
  {
    var fl = L.tileLayer.wmts(w.url, {
      renderOrder: $.inArray(id, map_config.renderlayers),
      version: w.version || "1.0.0",
      layers: geodash.codec.formatArray('layers', w, ''),
      styles: geodash.codec.formatArray('styles', w, ''),
      format: w.format || 'image/png',
      transparent: angular.isDefined(w.transparent) ? w.transparent : true,
      attribution: extract("source.attribution", layerConfig, undefined),
      tilematrixSet: "EPSG:3857",
      minZoom: extract("view.minZoom", layerConfig, 0),
      maxZoom: extract("view.maxZoom", layerConfig, 18),
      maxNativeZoom: extract("source.maxZoom", layerConfig, null)
    });
    live["featurelayers"][id] = fl;
    geodash.layers.init_featurelayer_post($scope, live, id, fl, layerConfig.visible);
  }
};

},{}],63:[function(require,module,exports){
module.exports = function(featureLayers, $scope, live, map_config)
{
  $.each(featureLayers, function(i, layerConfig){
    geodash.layers.init_featurelayer(layerConfig.id, layerConfig, $scope, live, map_config);
  });
};

},{}],64:[function(require,module,exports){
module.exports = function(event, args)
{
  var id = args["id_hide"] || args["id"];
  try {
    $("#"+id).modal('hide');
    var modal_scope = geodash.api.getScope(id);
    var aClear = args["clear"];
    if("clear" in args && args["clear"] != undefined)
    {
      modal_scope.$apply(function () {
        $.each(aClear,function(i, x){
          modal_scope[x] = undefined;
        });
      });
    }
  }
  catch(err){};
};

},{}],65:[function(require,module,exports){
'use strict';
module.exports = {
  hideModal: require("./hideModal"),
  saveAndHide: require("./saveAndHide"),
  showModal: require("./showModal"),
  switchModal: require("./switchModal"),
  toggleModal: require("./toggleModal")
};

},{"./hideModal":64,"./saveAndHide":66,"./showModal":67,"./switchModal":68,"./toggleModal":69}],66:[function(require,module,exports){
module.exports = function(event, args)
{
  geodash.listeners.hideModal(event, args);
  //
  var target = args["id_target"] || args["id"];
  var modal_scope_target = geodash.api.getScope(target);
  var modal_scope_new = geodash.api.buildScope(event, args);
  modal_scope_target.$apply(function () {
    $.each(modal_scope_new, function(key, value){
      modal_scope_target[key] = value;
    });
    // OR
    //$.extend(modal_scope_target, modal_scope_new);
  });
};
/*
geodash.listeners.saveAndSwitch = function(event, args)
{
  geodash.listeners.hideModal(event, args);
  //
  var target = args["id_show"] || args["id"];
  var modal_scope_target = geodash.api.getScope(target);
  var modal_scope_new = geodash.api.buildScope(event, args);
  modal_scope_target.$apply(function () {
    $.each(modal_scope_new, function(key, value){ modal_scope_target[key] = value; });
  });
};*/

},{}],67:[function(require,module,exports){
module.exports = function(event, args)
{
    console.log('event', event);
    console.log('args', args);
    //
    var id = args["id_show"] || args["id"];
    var modal_scope = geodash.api.getScope(id);
    var modal_scope_new = geodash.api.buildScope(event, args);
    var modalOptions = args['modal'] || {};
    modalOptions['show'] = false;
    modal_scope.$apply(function () {
        // Update Scope
        //modal_scope = $.extend(modal_scope, modal_scope_new);
        //$.each(modal_scope_new, function(key, value){ modal_scope[key] = value; });
        /////////////////
        modal_scope.push(modal_scope_new);// Pushes New Scope to Modal's Stack
        /////////////////
        setTimeout(function(){
          // Update Modal Tab Selection
          // See https://github.com/angular-ui/bootstrap/issues/1741
          var modalElement = $("#"+id);
          var targetTab = modal_scope.tab;
          if(targetTab != undefined)
          {
            modalElement.find('.nav-tabs li').each(function(){
              var that = $(this);
              var thisTab = that.find('a').attr('href').substring(1);
              if(targetTab == thisTab)
              {
                  that.addClass('active');
              }
              else
              {
                  that.removeClass('active');
              }
            });
            modalElement.find('.tab-pane').each(function(){
              var that = $(this);
              if(targetTab == that.attr('id'))
              {
                  that.addClass('in active');
              }
              else
              {
                  that.removeClass('in active');
              }
            });
          }
          else
          {
            modalElement.find('.nav-tabs li').slice(0, 1).addClass('active');
            modalElement.find('.nav-tabs li').slice(1).removeClass('active');
            modalElement.find('.tab-pane').slice(0, 1).addClass('in active');
            modalElement.find('.tab-pane').slice(1).removeClass('in active');
          }
          // Initalize Tooltips
          $('[data-toggle="tooltip"]', modalElement).tooltip();
          //Initialize Typeahead
          geodash.init.typeahead(
            modalElement,
            modal_scope.featurelayers,
            modal_scope.baselayers);
          // Toggle Modal
          $("#"+id).modal(modalOptions);
          $("#"+id).modal('toggle');
        },0);
    });
};

},{}],68:[function(require,module,exports){
module.exports = function(event, args)
{
  geodash.listeners.hideModal(event, args);
  geodash.listeners.showModal(event, args);
};

},{}],69:[function(require,module,exports){
module.exports = function(event, args)
{
  geodash.listeners.showModal(event, args);
};

},{}],70:[function(require,module,exports){
module.exports = function(chart, layer, feature, state)
{
  var html = "";
  html += "<div style=\"text-align:center;\"><b>"+chart.label+"</b></div><br>";
  html += "<div id=\""+chart.id+"\" class=\"geodash-popup-chart\"></div>";
  return html;
};

},{}],71:[function(require,module,exports){
module.exports = function(field, layer, feature, state)
{
  var output = field["output"] || field["attribute"];
  var html = undefined;
  var bInclude = false;
  if(field.when != undefined)
  {
    if(field.when.toLowerCase() == "defined")
    {
      if(feature.attributes[output] != undefined)
      {
        bInclude = true;
      }
    }
    else
    {
      bInclude = true;
    }
  }
  else
  {
    bInclude = true;
  }

  if(bInclude)
  {
    if(field.type == "link")
    {
      var value = field.value != undefined ? field.value : "{{ feature.attributes." + output + " }}";
      html = "<span><b>"+ field.label +":</b> <a target=\"_blank\" href=\""+field.url+"\">";
      html += value;
      html += "</a></span>";
    }
    else
    {
      var value = undefined;
      if(field.value != undefined)
      {
        value = field.value;
      }
      else
      {
        if(field.type == "date")
        {
          var format = field.format || "medium";
          value = "feature.attributes." + output + " | date:'"+format+"'"
        }
        else
        {
          value = "feature.attributes." + output
        }
        if(field.fallback)
        {
          value = "("+value+") || '"+field.fallback+"'"
        }
        value = "{{ "+value +" }}";
      }
      html = "<span><b>"+ field.label +":</b> "+value+"</span>";
    }
  }
  return html;
};

},{}],72:[function(require,module,exports){
module.exports = function($interpolate, featureLayer, feature, state)
{
  var popupTemplate = geodash.popup.buildPopupTemplate(featureLayer.popup, featureLayer, feature, state);
  var ctx = {
    'layer': featureLayer,
    'feature': feature,
    'state': state
  };
  return $interpolate(popupTemplate)(ctx);
};

},{}],73:[function(require,module,exports){
module.exports = function(popup, layer, feature, state)
{
  var panes = popup.panes;
  var popupTemplate = "";
  //////////////////
  if(angular.isString(popup.title))
  {
    popupTemplate += "<h5 style=\"word-wrap:break-word;text-align:center;\">"+popup.title+"</h5>";
  }
  //////////////////
  var paneContents = [];
  if(Array.isArray(panes))
  {
    for(var i = 0; i < panes.length; i++)
    {
      var pane = panes[i];
      var popupFields = [];
      var popupCharts = [];
      if("fields" in pane)
      {
        for(var j = 0; j < pane.fields.length; j++)
        {
          var popupField = geodash.popup.buildField(pane.fields[j], layer, feature, state);
          if(popupField != undefined)
          {
            popupFields.push(popupField);
          }
        }
      }
      if("charts" in pane)
      {
        for(var j = 0; j < pane.charts.length; j++)
        {
          var popupChart = geodash.popup.buildChart(pane.charts[j], layer, feature, state);
          if(popupChart != undefined)
          {
            popupCharts.push(popupChart);
          }
        }
      }
      var paneContent = popupFields.join("<br>");
      if(popupCharts.length > 0)
      {
        paneContent += "<hr>" + popupCharts.join("<br>");
      }
      paneContents.push(paneContent);
    }
    //////////////////
    if(panes.length > 1)
    {
      var tabs = [];
      var pane = panes[0];
      var html_tab ="<li class=\"active\"><a data-toggle=\"tab\" href=\"#"+pane.id+"\">"+pane.tab.label+"</a></li>";
      tabs.push(html_tab);
      for(var i = 1; i < panes.length; i++)
      {
        pane = panes[i];
        html_tab = "<li><a data-toggle=\"tab\" href=\"#"+pane.id+"\">"+pane.tab.label+"</a></li>"
        tabs.push(html_tab);
      }
      var html_tabs = "<ul class=\"nav nav-tabs nav-justified\">"+tabs.join("")+"</ul>";
      ///////////////
      var paneContentsWithWrapper = [];
      var html_pane = "<div id=\""+panes[0].id+"\" class=\"tab-pane fade in active\">"+paneContents[0]+"</div>";
      paneContentsWithWrapper.push(html_pane);
      for(var i = 1; i < panes.length; i++)
      {
        html_pane = "<div id=\""+panes[i].id+"\" class=\"tab-pane fade\">"+paneContents[i]+"</div>";
        paneContentsWithWrapper.push(html_pane);
      }
      ///////////////
      popupTemplate += html_tabs + "<div class=\"tab-content\">"+paneContentsWithWrapper.join("")+"</div>";
    }
    else
    {
      popupTemplate += paneContents[0];
    }
  }
  return popupTemplate;
};

},{}],74:[function(require,module,exports){
'use strict';
module.exports = {
  buildChart: require("./buildChart"),
  buildField: require("./buildField"),
  buildPopupTemplate: require("./buildPopupTemplate"),
  buildPopupContent: require("./buildPopupContent"),
  openPopup: require("./openPopup")
};

},{"./buildChart":70,"./buildField":71,"./buildPopupContent":72,"./buildPopupTemplate":73,"./openPopup":75}],75:[function(require,module,exports){
module.exports = function($interpolate, featureLayer, feature, location, map, state)
{
  var popupContent = geodash.popup.buildPopupContent($interpolate, featureLayer, feature, state);
  var popup = new L.Popup({maxWidth: (featureLayer.popup.maxWidth || 400)}, undefined);
  popup.setLatLng(new L.LatLng(location.lat, location.lon));
  popup.setContent(popupContent);
  map.openPopup(popup);
};

},{}],76:[function(require,module,exports){
'use strict';
module.exports = {
  D2R: (Math.PI / 180),
  R2D: (180 / Math.PI),
  point_to_bbox: require("./point_to_bbox"),
  point_to_radius: require("./point_to_radius"),
  tile_to_lat: require("./tile_to_lat"),
  tile_to_lon: require("./tile_to_lon"),
  tms_to_bbox: require("./tms_to_bbox")
};

},{"./point_to_bbox":77,"./point_to_radius":78,"./tile_to_lat":79,"./tile_to_lon":80,"./tms_to_bbox":81}],77:[function(require,module,exports){
module.exports = function(x, y, z, digits)
{
  var radius = geodash.tilemath.point_to_radius(z);
  var e = x + radius; if(digits != undefined && digits >= 0){e = e.toFixed(digits);}
  var w = x - radius; if(digits != undefined && digits >= 0){w = w.toFixed(digits);}
  var s = y - radius; if(digits != undefined && digits >= 0){s = s.toFixed(digits);}
  var n = y + radius; if(digits != undefined && digits >= 0){n = n.toFixed(digits);}
  return [w, s, e, n];
};

},{}],78:[function(require,module,exports){
module.exports = function(z)
{
  return (geodash.config.click_radius || 4.0) / z;
};

},{}],79:[function(require,module,exports){
module.exports = function(y, z)
{
  n = Math.pi - 2 * Math.PI * y / Math.pow(2,z);
  return ( R2D * Math.atan(0.5 * ( Math.exp(n) - Math.exp(-n))));
};

},{}],80:[function(require,module,exports){
module.exports = function(x, z)
{
  return x / Math.pow(2, z) * 360-180;
};

},{}],81:[function(require,module,exports){
module.exports = function(x, y, z)
{
  var e = geodash.tilemath.tile_to_lon(x+1, z);
  var w = geodash.tilemath.tile_to_lon(x, z);
  var s = geodash.tilemath.tile_to_lat(y+1, z);
  var n = geodash.tilemath.tile_to_lat(y, z);
  return [w, s, e, n];
};

},{}],82:[function(require,module,exports){
'use strict';
module.exports = {
  toggleOptions: require("./toggleOptions"),
  showOptions: require("./showOptions"),
  init_slider_label: require("./init_slider_label"),
  init_slider_slider: require("./init_slider_slider"),
  update_slider_label: require("./update_slider_label")
};

},{"./init_slider_label":83,"./init_slider_slider":84,"./showOptions":85,"./toggleOptions":86,"./update_slider_label":87}],83:[function(require,module,exports){
module.exports = function($interpolate, that, type, range, value)
{
  if(type=="ordinal")
  {
    var ctx = {"value": value};
    that.data('label').html($interpolate(that.data('label-template'))(ctx));
  }
  else if(type=="continuous")
  {
    if(($.type(range) == "boolean" && range ) || (range.toLowerCase() == "true"))
    {
      var ctx = {"values": [value[0], value[1]]};
      that.data('label').html($interpolate(that.data('label-template'))(ctx));
    }
    else if(range=="min" || range=="max")
    {
      var ctx = {"value": value};
      that.data('label').html($interpolate(that.data('label-template'))(ctx));
    }
  }
};

},{}],84:[function(require,module,exports){
module.exports = function($interpolate, $scope, that, type, range, value, minValue, maxValue, step)
{
  if(type=="ordinal")
  {
    that.slider({
      range: (($.type(range) == "boolean" && range ) || (range.toLowerCase() == "true")) ? true : range,
      value: value,
      min: 0,
      max: maxValue,
      step: 1,
      slide: function(event, ui) {
          geodash.ui.update_slider_label.apply(this, [$interpolate, event, ui]);
          var output = that.data('output');
          var newValue = that.data('options')[ui.value];
          var filter = {};
          filter[output] = newValue;
          geodash.api.intend("filterChanged", {"layer":"popatrisk", "filter":filter}, $scope);
      }
    });
  }
  else if(type=="continuous")
  {
    if(($.type(range) == "boolean" && range ) || (range.toLowerCase() == "true"))
    {
      that.slider({
        range: true,
        values: value,
        min: minValue,
        max: maxValue,
        step: step,
        slide: function(event, ui) {
            geodash.ui.update_slider_label.apply(this, [$interpolate, event, ui]);
            var output = that.data('output');
            var newValue = ui.values;
            var filter = {};
            filter[output] = newValue;
            geodash.api.intend("filterChanged", {"layer":"popatrisk", "filter":filter}, $scope);
        }
      });
    }
    else if(range=="min" || range=="max")
    {
      that.slider({
        range: range,
        value: value,
        min: minValue,
        max: maxValue,
        step: step,
        slide: function(event, ui) {
            geodash.ui.update_slider_label.apply(this, [$interpolate, event, ui]);
            var output = that.data('output');
            var newValue = ui.value / 100.0;
            var filter = {};
            filter[output] = newValue;
            geodash.api.intend("filterChanged", {"layer":"popatrisk", "filter":filter}, $scope);
        }
      });
    }
  }
};

},{}],85:[function(require,module,exports){
module.exports = function($event, selector)
{
  try{
    var input = $(selector);
    input.typeahead('open');
    input.data('ttTypeahead').menu.update.apply(input.data('ttTypeahead').menu, [""]);
    var engine = input.data('engine');
    engine.search.apply(engine, [""])
  }catch(err){};
};

},{}],86:[function(require,module,exports){
module.exports = function($event, selector)
{
  //var selector = $(event.currentTarget).attr('data-target');
  //try{ $(selector).typeahead('close'); }catch(err){};
  return geodash.ui.showOptions($event, selector);
};

},{}],87:[function(require,module,exports){
module.exports = function($interpolate, event, ui)
{
  var that = $(this);
  var type = that.data('type');
  var range = that.data('range');

  if(type=="ordinal")
  {
    var ctx = {"value": that.data('options')[ui.value]};
    that.data('label').html($interpolate(that.data('label-template'))(ctx));
  }
  else if(type=="continuous")
  {
    if(($.type(range) == "boolean" && range ) || (range.toLowerCase() == "true"))
    {
      var ctx = {"values": [ui.values[0], ui.values[1]]};
      that.data('label').html($interpolate(that.data('label-template'))(ctx));
    }
    else if(range=="min" || range=="max")
    {
      var ctx = {"value": (ui.value / 100.0)};
      that.data('label').html($interpolate(that.data('label-template'))(ctx));
    }
  }
};

},{}],88:[function(require,module,exports){
module.exports = function(a, b)
{
  if(b.toString != undefined && b.toString().startsWith('LatLng'))
  {
    return b;
  }
  else
  {
    var p = L.Projection.SphericalMercator;
    var minDistance = undefined;
    var closestPoint = undefined;
    $.each(b._layers, function(id, layer)
    {
      var rings = [];
      if(layer.feature.geometry.type == "MultiPolygon")
      {
        for(var i = 0; i < layer._latlngs.length; i++)
        {
          for(var j = 0; j < layer._latlngs[i].length; j++)
          {
            rings.push(layer._latlngs[i][j]);
          }
        }
      }
      else
      {
        rings.push(layer._latlngs);
      }
      for(var r = 0; r < rings.length; r++)
      {
        var verticies = rings[r];
        var i = 0;
        if(minDistance == undefined)
        {
          minDistance = L.LineUtil.pointToSegmentDistance(
            p.project(a),
            p.project(verticies[i]),
            p.project(verticies[i+1]));
          closestPoint = L.LineUtil.closestPointOnSegment(
            p.project(a),
            p.project(verticies[i]),
            p.project(verticies[i+1]));
          i++;
        }
        for(; i < verticies.length -1; i++)
        {
          var d = L.LineUtil.pointToSegmentDistance(
            p.project(a),
            p.project(verticies[i]),
            p.project(verticies[i+1]));
          if(d < minDistance)
          {
            minDistance = d;
            closestPoint = L.LineUtil.closestPointOnSegment(
              p.project(a),
              p.project(verticies[i]),
              p.project(verticies[i+1]));
          }
        }
      }
    });
    return p.unproject(closestPoint);
  }
};

},{}],89:[function(require,module,exports){
module.exports = function(a, b)
{
  var p = L.Projection.SphericalMercator;
  if(b.toString != undefined && b.toString().startsWith('LatLng'))
  {
    return (p.project(a)).distanceTo(p.project(b));
  }
  else
  {
    var minDistance = undefined;
    $.each(b._layers, function(id, layer)
    {
      var rings = [];
      if(layer.feature.geometry.type == "MultiPolygon")
      {
        for(var i = 0; i < layer._latlngs.length; i++)
        {
          for(var j = 0; j < layer._latlngs[i].length; j++)
          {
            rings.push(layer._latlngs[i][j]);
          }
        }
      }
      else
      {
        rings.push(layer._latlngs);
      }
      for(var r = 0; r < rings.length; r++)
      {
        var verticies = rings[r];
        var i = 0;
        if(minDistance == undefined)
        {
          minDistance = L.LineUtil.pointToSegmentDistance(
            p.project(a),
            p.project(verticies[i]),
            p.project(verticies[i+1]));
          i++;
        }
        for(; i < verticies.length -1; i++)
        {
          var d = L.LineUtil.pointToSegmentDistance(
            p.project(a),
            p.project(verticies[i]),
            p.project(verticies[i+1]));
          if(d < minDistance)
          {
            minDistance = d;
          }
        }
      }
    });
    return minDistance;
  }
};

},{}],90:[function(require,module,exports){
module.exports = function(nearbyFeatures, target)
{
  var closestFeature = undefined;
  var closestDistance = 0;
  var closestLocation = undefined;
  if(nearbyFeatures != undefined)
  {
    if(nearbyFeatures.length > 0)
    {
      closestFeature = nearbyFeatures[0];
      closestDistance = geodash.vecmath.distance(target, nearbyFeatures[0].geometry);
      closestLocation = geodash.vecmath.closestLocation(target, nearbyFeatures[0].geometry);
      for(var i = 1; i < nearbyFeatures.length ;i++)
      {
        var f = nearbyFeatures[i];
        if(geodash.vecmath.distance(target, f.geometry) < closestDistance)
        {
          closestFeature = f;
          closestDistance = geodash.vecmath.distance(target, f.geometry);
          closestLocation = geodash.vecmath.closestLocation(target, f.geometry);
        }
      }
    }
  }
  return {'feature': closestFeature, 'location': closestLocation};
};

},{}],91:[function(require,module,exports){
'use strict';
module.exports = {
  closestLocation: require("./closestLocation"),
  distance: require("./distance"),
  getClosestFeatureAndLocation: require("./getClosestFeatureAndLocation")
};

},{"./closestLocation":88,"./distance":89,"./getClosestFeatureAndLocation":90}],92:[function(require,module,exports){
'use strict';
window.geodash = require("./geodash");

window.expand = function(x)
{
  var newArray = [];
  if(Array.isArray(x))
  {
    for(var i = 0; i < x.length; i++)
    {
      var value = x[i];
      if(angular.isString(value))
      {
        if(value.indexOf(".") != -1)
        {
          newArray = newArray.concat(value.split("."));
        }
        else
        {
          newArray.push(value);
        }
      }
      else
      {
        newArray.push(value);
      }
    }
  }
  else if(angular.isString(x))
  {
    newArray = x.split(".");
  }
  return newArray;
};

window.extract = function(keyChain, node, fallback)
{
  if(angular.isString(keyChain))
  {
    keyChain = keyChain.split(".");
  }
  var obj = undefined;
  if(keyChain.length==0)
  {
    if(node != undefined && node != null)
    {
      obj = node;
    }
    else
    {
      obj = fallback;
    }
  }
  else
  {
    var newKeyChain = keyChain.slice(1);
    if(newKeyChain.length == 0)
    {
      if(angular.isString(keyChain[0]) && keyChain[0].toLowerCase() == "length")
      {
        if(Array.isArray(node))
        {
          obj = node.length;
        }
        else if(angular.isDefined(node))
        {
          obj = node["length"];
        }
        else
        {
          obj = 0;
        }
      }
    }

    if(obj == undefined && angular.isDefined(node))
    {
      if(Array.isArray(node))
      {
        var index = angular.isString(keyChain[0]) ?
          parseInt(keyChain[0], 10) :
          keyChain[0];
        obj = extract(newKeyChain, node[index], fallback);
      }
      else
      {
        obj = extract(newKeyChain, node[""+keyChain[0]], fallback);
      }
    }
	}
	return obj;
};

window.getHashValue = function(keys, type)
{
    var value = undefined;
    if(typeof keys === 'string')
    {
      keys = [keys.toLowerCase()];
    }
    else
    {
      keys = $.map(keys,function(value, i){return value.toLowerCase();});
    }
    var hash_lc = location.hash.toLowerCase();
    for(var i = 0; i < keys.length; i++)
    {
      var key = keys[i];
      var keyAndHash = hash_lc.match(new RegExp(key + '=([^&]*)'));
      if(keyAndHash)
      {
          value = keyAndHash[1];
          if(value != undefined && value != null && value != "")
          {
            break;
          }
      }
    }

    if(type != undefined)
    {
        if(type == "integer")
        {
          value = (value != undefined && value != null && value != "") ? parseInt(value, 10) : undefined;
        }
        else if(type == "stringarray")
        {
          if(value != undefined)
          {
            var newValue = value.split(",");
            value = newValue;
          }
        }
        else if(type == "integerarray")
        {
          if(value != undefined)
          {
            var sValue = value.split(",");
            var newValue = [];
            for(var i = 0; i < sValue.length; i++)
            {
              var v = sValue[i];
              newValue.push((v != undefined && v != null && v != "") ? parseInt(v, 10) : undefined);
            }
            value = newValue;
          }
        }
        else if(type == "float")
        {
          value = (value != undefined && value != null && value != "") ? parseFloat(value) : undefined;
        }
        else if(type == "floatarray")
        {
          if(value !=undefined)
          {
            var sValue = value.split(",");
            var newValue = [];
            for(var i = 0; i < sValue.length; i++)
            {
              var v = sValue[i];
              newValue.push((v != undefined && v != null && v != "") ? parseFloat(v) : undefined);
            }
            value = newValue;
          }
        }
    }
    return value;
};

window.hasHashValue = function(keys)
{
    var value = getHashValue(keys);
    return value != undefined && value != null && value != "";
};
window.getHashValueAsStringArray = function(keys)
{
  return getHashValue(keys, "stringarray");
};
window.getHashValueAsInteger = function(keys)
{
  return getHashValue(keys, "integer");
};
window.getHashValueAsIntegerArray = function(keys)
{
  return getHashValue(keys, "integerarray");
};
window.getHashValueAsFloat = function(keys)
{
  return getHashValue(keys, "float");
};
window.sortLayers = function(layers, reverse)
{
  var renderLayers = $.isArray(layers) ? layers : $.map(layers, function(layer){return layer;});
  renderLayers = renderLayers.sort(function(a, b){
      return a.options.renderOrder - b.options.renderOrder;
  });
  if(reverse === true)
    renderLayers.reverse();
  return renderLayers;
};
window.updateRenderOrder = function(layers)
{
    for(var i = 0; i < layers.length; i++)
    {
        layers[i].bringToFront();
    }
};
window.layersAsArray = function(layers)
{
  return $.map(layers, function(layer, id){return {'id':id, 'layer':layer};});
};

},{"./geodash":40}]},{},[92]);
