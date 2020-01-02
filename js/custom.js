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

/* Map */
var map = new ol.Map({
  target: 'map'
})

map.addLayer(vworldLayer)
map.setView(view)