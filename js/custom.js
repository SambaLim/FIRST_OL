var dummy = {
    geoServerUrl: 'http://localhost:8080/geoserver/',
    centerPoint: [126.89539166400212, 37.48123739404283],
    points: [
      { id: 1, title: '웨이버스', description: '서울특별시 구로구 디지털로 26길 61, 1001호', lon: 126.89539166400212, lat: 37.48123739404283 },
      { id: 2, title: '낭만 부대찌개', description: '서울 구로구 디지털로 288 대륭포스트타워1차 B104호', lon: 126.89549360889943, lat: 37.48358932087049 },
      { id: 3, title: '영호돈까스', description: '서울 구로구 시흥대로163길 21', lon: 126.89867602894086, lat: 37.481838685547444 }
    ]
  }
  
  /* Center */
  var center = ol.proj.transform(dummy.centerPoint, 'EPSG:4326', 'EPSG:3857');
    
  /* View */
  var view = new ol.View({
    projection: 'EPSG:3857',
    center: center,
    zoom: 19
  })
    
  /* Vworld 2D Base Layer */
  var vworldLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://xdworld.vworld.kr:8080/2d/Base/service/{z}/{x}/{y}.png',
      crossOrigin: ''
    })
  })
  
  /* WMS Layer */
  // http://localhost:8080/geoserver/wavus/wms?service=WMS&version=1.1.0&request=GetMap&layers=wavus%3Aal_11_d010_20191207&bbox=179398.21875%2C436464.4375%2C219590.828125%2C466311.25&width=768&height=570&srs=EPSG%3A5174&format=application/openlayers
  var wmsLayer = new ol.layer.Tile({
    extent: ol.proj.transformExtent([126.89, 37.48, 126.90, 37.49], 'EPSG:4326', 'EPSG:3857'),
    source: new ol.source.TileWMS({
      url: dummy.geoServerUrl + 'wavus/wms',
      params: {
        'VERSION': '1.1.0',
        'LAYERS': 'wavus:al_11_d010_20191207',
        'BBOX': [179398.21875, 436464.4375, 219590.828125, 466311.25],
        'SRS': 'EPSG:5174',
        'FORMAT': 'image/png'
      },
      serverType: 'geoserver'
    })
  })
    
  /* Map */
  var map = new ol.Map({
    target: 'map'
  })
    
  map.addLayer(vworldLayer)
  map.addLayer(wmsLayer)
  map.setView(view)