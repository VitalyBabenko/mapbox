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
    title: 'Light',
    url: 'mapbox://styles/lamapch/clwoz41jt011101r0bzo85ivl',
    image: lightMapPreview,
  },
  {
    title: 'Dark',
    url: 'mapbox://styles/lamapch/clwrfixmy013601pnfpzzhfpr',
    image: darkMapPreview,
  },
  {
    title: 'Streets',
    url: 'mapbox://styles/lamapch/clwrp200h00kl01po0jjj6hai',
    image: streetsMapPreview,
  },
  {
    title: 'Satellite',
    url: 'mapbox://styles/lamapch/clwrojbwp017a01r0b3xj521f',
    image: satelliteMapPreview,
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
  // id: 'buildingsSource',
  // url: 'mapbox://lamapch.02cb199k',
  // sourceLayer: 'CAD_BATIMENT_HORSOL_WGS84-ack86c',

  id: 'buildingsSource',
  url: 'mapbox://lamapch.big07zk7',
  sourceLayer: 'buildings_temp-4p1ekb',
}

export const DEFAULT_PAINT = {
  'fill-outline-color': 'rgba(256,256,256,1)',
  'fill-color': '#006cd5',
}

export const PAINT_BY_TYPE = {
  'fill-outline-color': 'rgba(256,256,256,1)',
  'fill-color': [
    'match',
    ['get', 'TYPOLOGIE'],
    'Hab plusieurs logements',
    '#641E16',
    'Hab. - rez activité',
    '#943126',
    'Habitation - activités',
    '#A93226',
    'Hab. deux logements',
    '#CD6155',
    'Habitation un logement',
    '#F1948A',
    'Résidence meublée',
    '#E6B0AA',
    'Hôtel',
    '#F2D7D5',
    'Bureaux',
    '#D4AC0D',
    'Garage',
    '#F4D03F',
    'Garage privé',
    '#F9E79F',
    'Atelier',
    '#6E2C00',
    'Centre commercial',
    '#784212',
    'Commerce',
    '#9C640C',
    'Dépôt',
    '#B9770E',
    'Hangar',
    '#DC7633',
    'Restaurant',
    '#CA6F1E',
    'Station-service',
    '#F0B27A',
    'Usine',
    '#EDBB99',
    'EMS',
    '#2874A6',
    'Etablissement de soins',
    '#2874A6',
    'Hôpital, Clinique',
    '#2874A6',
    'Ecole privée',
    '#5499C7',
    `Jardin d'enfants`,
    '#5499C7',
    'Autre héberg. collectif',
    '#5499C7',
    'Conservatoire musique',
    '#5499C7',
    'Foyer',
    '#5499C7',
    'Internat',
    '#5499C7',
    'Autre prod. agricole',
    '#138D75',
    'Ecurie',
    '#138D75',
    'Ferme',
    '#138D75',
    'Hangar agricole',
    '#138D75',
    'Porcherie',
    '#138D75',
    'Poulailler',
    '#138D75',
    'Serre',
    '#138D75',
    'Autre bât. de loisirs',
    '#D4E6F1',
    'Cinéma',
    '#D4E6F1',
    `Halle d'exposition`,
    '#D4E6F1',
    'Manège',
    '#D4E6F1',
    'Musée',
    '#D4E6F1',
    'Salle de spectacle',
    '#D4E6F1',
    'Salle de sport',
    '#D4E6F1',
    'Stade',
    '#D4E6F1',
    'Stand de tir',
    '#D4E6F1',
    'Théâtre',
    '#D4E6F1',
    'Centre de loisirs',
    '#D4E6F1',
    'Centre sportif',
    '#D4E6F1',
    'Consulat',
    '#5D6D7E',
    'Mission permanente',
    '#5D6D7E',
    'Autre bât. < 20 m2',
    '#FAE5D3',
    'Autre bât. 20 m2 et plus',
    '#FAE5D3',
    `Autre bât. d'activités`,
    '#FAE5D3',
    'Autre équip. collectif',
    '#FAE5D3',
    'Central de télécom.',
    '#FAE5D3',
    'Chantier naval',
    '#FAE5D3',
    'Installation téléphonie mobile',
    '#FAE5D3',
    'Poste',
    '#FAE5D3',
    '#641E16',
  ],
  'fill-opacity': 0.8,
}

export const PAINT_BY_APARTS_QTY = {
  'fill-outline-color': 'rgba(256,256,256,1)',
  'fill-color': {
    property: 'APARTS_QTY',
    stops: [
      [0, '#D4E6F1'],
      [1, '#85C1E9'],
      [2, '#5DADE2'],
      [6, '#2980B9'],
      [11, '#1F618D'],
      [21, '#1B4F72'],
      [41, '#0D2A4E'],
    ],
  },
  'fill-opacity': 0.8,
}

export const PAINT_BY_CONSTRUCTION_PERIOD = {
  'fill-outline-color': 'rgba(256,256,256,1)',
  'fill-color': {
    property: 'EP_CONSTR',
    stops: [
      [0, '#D4E6F1'],
      [1900, '#6E2C00'],
      [1940, '#A04000'],
      [1960, '#D35400'],
      [1980, '#E67E22'],
      [2000, '#E59866'],
      [2020, '#F8C471'],
      [2040, '#FAE5D3'],
    ],
  },
  'fill-opacity': 0.8,
}
