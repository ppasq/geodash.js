module.exports = function(options)
{
  var resource = extract("resource", options);
  var element = extract("element", options);
  var app = extract("app", options);
  var appName = extract("appName", options);

  if(geodash.util.isDefined(resource))
  {
    var request = undefined;
    if(geodash.util.isString(element.attr(resource.local)))
    {
      app.value(resource.name, extract(element.attr(resource.local), geodash));
      return {"success": true};
    }
    else if(geodash.util.isString(element.attr(resource.remote)))
    {
      return {
        "success": true,
        "request": {
          'name': resource.name,
          'url': element.attr(resource.remote)
        }
      };
    }
    else if(geodash.util.hasHashValue(appName+":"+resource.hash))
    {
      return {
        "success": true,
        "request": {
          'name': resource.name,
          'url': geodash.util.getHashValue(appName+":"+resource.hash)
        }
      };
    }
    else if(geodash.util.getQueryStringValue(appName+":"+resource.hash) != null)
    {
      return {
        "success": true,
        "request": {
          'name': resource.name,
          'url': geodash.util.getQueryStringValue(appName+":"+resource.hash)
        }
      };
    }
    else
    {
      app.value(resource.name, extract(resource.fallback, geodash));
      return {"success": true};
    }
  }
  else
  {
    return {"success": false, "message": "Could not process resource, because it is undefined."};
  }
};
