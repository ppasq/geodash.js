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
