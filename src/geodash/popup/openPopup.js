module.exports = function($interpolate, featureLayer, feature, location, map, state)
{
  var popupContentAndTitle = geodash.popup.buildPopupContentAndTitle($interpolate, featureLayer, feature, state);
  if(geodash.mapping_library = "ol3")
  {
    var popup = map.getOverlays().item(0);
    var view = map.getView();
    var newCenter = ol.proj.fromLonLat([location.lon, location.lat], view.getProjection());
    popup.setPosition(newCenter);
    var element = $("#popup");
    element.popover('destroy');
    element.popover({
      'placement': 'top',
      'animation': false,
      'html': true,
      'content': popupContentAndTitle.content,
      'title': popupContentAndTitle.title
    });

    setTimeout(function(){
      element.popover('show');

      // Add Listeners for Tabs
      $('.popover').each(function(){
        var popoverElement = $(this);
        $('.nav-tabs', popoverElement).each(function(){
          var tabs = $(this);
          tabs.on('click', '[data-toggle="tab"]', function(e){
            e.preventDefault();

            var target = $(this).attr("href");

            $("li", tabs).removeClass("active");
            $(this).parents("li:first").addClass("active");

            $(".tab-pane", popoverElement).removeClass("in active");
            $(target).addClass("in active");

            return false;
          });
        });
      });

      var listeners = extract("popup.listeners.show", geodash.config);
      if(Array.isArray(listeners))
      {
        for(var i = 0; i < listeners.length; i++)
        {
          listeners[i](featureLayer, feature, location, map, state);
        }
      }

      // Pan to Popup
      var pixel = map.getPixelFromCoordinate(newCenter);
      var offset = Math.floor($(".popover").height() / 2.0);
      pixel[1] = pixel[1] - offset;
      var pan = ol.animation.pan({ duration: 500, source: view.getCenter() });
      map.beforeRender(pan);
      view.setCenter(map.getCoordinateFromPixel(pixel));

    },0);

  }
  else
  {
    var popup = new L.Popup({maxWidth: (featureLayer.popup.maxWidth || 400)}, undefined);
    popup.setLatLng(new L.LatLng(location.lat, location.lon));
    popup.setContent(popupContentAndTitle.content);
    map.openPopup(popup);
  }
};
