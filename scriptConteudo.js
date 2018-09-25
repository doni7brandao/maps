google.maps.visualRefresh = true;

function initialize() {
   
  var styles = [
  {
    featureType: "all",
    stylers: [
      { saturation: -70 },
      { hue: '#DAE2C5' },
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "administrative.locality",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      { "visibility": "off" }
    ]
  }
  ];
  
  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Mapa Modificado"});
  
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-27.806317, -50.336795),
      mapTypeIds: google.maps.MapTypeId.TERRAIN,
   mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.TERRAIN, 'map_style']
    }
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'),
                                mapOptions);

  setMarkers(map, campi);
  
  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
}

/**
 * Data for the markers consisting of a name, a LatLng and a zIndex for
 * the order in which these markers should display on top of each
 * other.
 */

    var markers = [];

var campi = [
      ['IFSC - Reitoria', -27.600051, -48.573303, 1],
      ['IFSC Campus Florianópolis-Continente', -27.600004, -48.572026, 2],
      ['IFSC Campus Florianópolis', -27.593151, -48.543246, 3],
      ['IFSC Campus Jaraguá do Sul', -26.477945, -49.089712, 4],
      ['IFSC Campus Joinville', -26.277682, -48.88067, 5],
      ['IFSC Campus Araranguá', -28.946081, -49.494917, 6],
      ['IFSC Campus Chapecó', -27.13312, -52.601303, 7],
      ['IFSC Campus São José', -27.608451, -48.632751, 8],
      ['IFSC Campus Itajaí', -26.906699, -48.66253, 9],
      ['IFSC Campus Xanxerê', -26.877238, -52.418999, 10],
      ['IFSC Campus Gaspar', -26.900391, -49.00532, 11],
      ['IFSC Campus São Miguel do Oeste', -26.741746, -53.517621, 12],
      ['IFSC Campus Lages', -27.806317, -50.336795, 13],
      ['IFSC Campus Caçador', -26.755829, -50.955088, 14],
      ['IFSC Campus Palhoça Bilíngüe', -27.637525, -48.651903, 15],
      ['IFSC Campus Canoinhas', -26.178284, -50.373237, 16],
      ['IFSC Campus Criciúma', -28.676973, -49.304932, 17],
      ['IFSC Campus Geraldo Werninghaus', -26.469275, -49.11255, 18],
      ['IFSC Campus Garopaba', -28.04665, -48.628227, 19],
      ['Instituto Federal de Santa Catarina - Reitoria', -27.599994, -48.573303, 20],
      ['IFSC EaD (Educação a Distância)', -27.591722, -48.558357, 21]
];

function setMarkers(map, locations) {
  // Add markers to the map

  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.
  var image = {
    url: 'logoIFs.png',
    // This marker is 64 pixels wide by 64 pixels tall.
    size: new google.maps.Size(64, 64),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 64)
  };
  var shadow = {
    url: 'logoIFsombra.png',
    // The shadow image is larger in the horizontal dimension
    // while the position and offset are the same as for the main image.
    size: new google.maps.Size(64, 64),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon.
  // The type defines an HTML &lt;area&gt; element 'poly' which
  // traces out a polygon as a series of X,Y points. The final
  // coordinate closes the poly by connecting to the first
  // coordinate.
  var shape = {
      coord: [1, 1, 1, 64, 64, 64, 64 , 1],
      type: 'poly'
  };
    
  for (var i = 0; i < locations.length; i++) {
    
    var campus = locations[i];
    var myLatLng = new google.maps.LatLng(campus[1], campus[2]);
    
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+campus[0]+'</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      '</p>'+
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    
    var marker = new google.maps.Marker({
        position: myLatLng,
        animation: google.maps.Animation.DROP,
        draggable:false,
        map: map,
        shadow: shadow,
        icon: image,
        shape: shape,
        title: campus[0],
        zIndex: campus[3]
    });
    
    google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
    });
  }
  
}

google.maps.event.addDomListener(window, 'load', initialize);