const COUNTIES_SOURCE = {
  id: 'countiesSource',
  url: 'mapbox://lamapch.3tdoe4uu',
  sourceLayer: 'CAD_COMMUNE_WGS84-amqszz',
}

const PLOTS_SOURCE = {
  id: 'plotsSource',
  url: 'mapbox://lamapch.64ix47h1',
  sourceLayer: 'CAD_PARCELLE_MENSU_WGS84-dor0ac',
}

const BUILDINGS_SOURCE = {
  id: 'buildingsSource',
  url: 'mapbox://lamapch.a77ua3tf',
  sourceLayer: 'buildings-0geqfo',
}

const ZONES_SOURCE = {
  id: 'zonesSource',
  url: 'mapbox://lamapch.3odldfkm',
  sourceLayer: 'SIT_ZONE_AMENAG_WGS84-9ut6z9',
}

const PROTECTED_SOURCE = {
  id: 'protectedSource',
  url: 'mapbox://lamapch.5u9b7mgr',
  sourceLayer: 'DPS_CLASSEMENT_WGS84-6a60ee',
}

const POOLS_SOURCE = {
  id: 'poolsSource',
  url: 'mapbox://lamapch.1tx1jwyz',
  sourceLayer: 'CAD_PISCINE_WGS84-9w9qvd',
}

const PUBLIC_PLOTS_TYPES = [
  'DP communal',
  'DP communal (hors indice)',
  'DP cantonal',
  'chemin vicinal',
  'dépendance',
]

export {
  COUNTIES_SOURCE,
  PLOTS_SOURCE,
  BUILDINGS_SOURCE,
  ZONES_SOURCE,
  PROTECTED_SOURCE,
  POOLS_SOURCE,
  PUBLIC_PLOTS_TYPES,
}
