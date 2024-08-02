import lightMapPreview from '../assets/images/lightMapPreview.png'
import darkMapPreview from '../assets/images/darkMapPreview.png'
import streetsMapPreview from '../assets/images/streetsMapPreview.png'
import satelliteMapPreview from '../assets/images/satelliteMapPreview.png'

export const INITIAL_VIEW = {
  LONGITUDE: 6.143724445834019,
  LATITUDE: 46.203988837044086,
  ZOOM: 10.5,
}

export const MAP_STYLES = [
  {
    TITLE: 'Light',
    URL: 'mapbox://styles/lamapch/clwoz41jt011101r0bzo85ivl',
    IMAGE: lightMapPreview,
  },
  {
    TITLE: 'Dark',
    URL: 'mapbox://styles/lamapch/clwrfixmy013601pnfpzzhfpr',
    IMAGE: darkMapPreview,
  },
  {
    TITLE: 'Streets',
    URL: 'mapbox://styles/lamapch/clwrp200h00kl01po0jjj6hai',
    IMAGE: streetsMapPreview,
  },
  {
    TITLE: 'Satellite',
    URL: 'mapbox://styles/lamapch/clwrojbwp017a01r0b3xj521f',
    IMAGE: satelliteMapPreview,
  },
]

export const MODES = {
  COUNTIES: 'counties',
  BUILDINGS: 'buildings',
  PLOTS: 'plots',
}

export const COUNTIES_SOURCE = {
  id: 'countiesSource',
  url: 'mapbox://lamapch.9a3g6tja',
  sourceLayer: 'kanton_28-filt_reworked-a2cfbe',
}

export const PLOTS_SOURCE = {
  id: 'plotsSource',
  url: 'mapbox://lamapch.64ix47h1',
  sourceLayer: 'CAD_PARCELLE_MENSU_WGS84-dor0ac',
}

export const BUILDINGS_SOURCE = {
  id: 'buildingsSource',
  url: 'mapbox://lamapch.02cb199k',
  sourceLayer: 'CAD_BATIMENT_HORSOL_WGS84-ack86c',
}
