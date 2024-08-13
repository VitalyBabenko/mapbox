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
  PROTECTED: 'protected',
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
  url: 'mapbox://lamapch.469rm1o0',
  sourceLayer: 'buildings_temp-arj1ps',
}

export const ZONES_SOURCE = {
  id: 'zonesSource',
  url: 'mapbox://lamapch.3odldfkm',
  sourceLayer: 'SIT_ZONE_AMENAG_WGS84-9ut6z9',
}

export const PROTECTED_SOURCE = {
  id: 'protectedSource',
  url: 'mapbox://lamapch.5u9b7mgr',
  sourceLayer: 'DPS_CLASSEMENT_WGS84-6a60ee',
}

export const DEFAULT_PAINT = {
  'fill-outline-color': 'rgba(256,256,256,1)',
  'fill-color': '#80b4f6',
  getItems: () => [],
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
    '#556A84',
  ],
  'fill-opacity': 0.8,
  getItems: function () {
    const trimmedColors = this['fill-color'].slice(2).slice(0, -1)

    const notFoundItem = { name: 'Not found', color: '#556A84' }
    const result = trimmedColors
      .map((item, index) => {
        if (!(index % 2)) {
          return {
            name: item,
            color: trimmedColors[index + 1],
          }
        }
        return null
      })
      .filter(item => item)

    return [notFoundItem, ...result]
  },
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
  getItems: function () {
    return [
      { name: 'No unit', color: '#D4E6F1' },
      { name: '1 unit', color: '#85C1E9' },
      { name: '2-5 units', color: '#5DADE2' },
      { name: '6-10 units', color: '#2980B9' },
      { name: '11-20 units', color: '#1F618D' },
      { name: '21-40 units', color: '#1B4F72' },
      { name: '41+ units', color: '#0D2A4E' },
    ]
  },
}

export const PAINT_BY_CONSTRUCTION_PERIOD = {
  'fill-outline-color': 'rgba(256,256,256,1)',
  'fill-color': {
    property: 'EP_CONSTR',
    stops: [
      [0, '#556A84'],
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
  getItems: () => {
    return [
      { name: 'Not found', color: '#556A84' },
      { name: '< 1900', color: '#6E2C00' },
      { name: '1900 - 1940', color: '#A04000' },
      { name: '1940 - 1960', color: '#D35400' },
      { name: '1960 - 1980', color: '#E67E22' },
      { name: '1980 - 2000', color: '#E59866' },
      { name: '2000 - 2020', color: '#F8C471' },
      { name: '> 2021', color: '#FAE5D3' },
    ]
  },
}

export const PAINT_BY_LAST_TRANSACTION = {
  'fill-outline-color': 'rgba(256,256,256,1)',
  'fill-color': {
    property: 'TRNSC_DATE',
    default: '#4A235A',
    stops: [
      [1994, '#76448A'],
      [2001, '#9B59B6'],
      [2006, '#BB8FCE'],
      [2011, '#D7BDE2'],
      [2016, '#E8DAEF'],
      [2021, '#F5EEF8'],
    ],
  },
  'fill-opacity': 0.8,
  getItems: () => {
    return [
      { name: 'No Transaction', color: '#4A235A' },
      { name: '1994-2000', color: '#76448A' },
      { name: '2001-2005', color: '#9B59B6' },
      { name: '2006-2010', color: '#BB8FCE' },
      { name: '2011-2015', color: '#D7BDE2' },
      { name: '2016-2020', color: '#E8DAEF' },
      { name: '2021-today', color: '#F5EEF8' },
    ]
  },
}

export const PAINT_BY_TRANSACTION_AMOUNT = {
  'fill-outline-color': 'rgba(256,256,256,1)',
  'fill-color': {
    property: 'TRNSC_PRC',
    default: '#556A84',
    stops: [
      [0, '#556A84'],
      [1, '#186A3B'],
      [500000, '#1E8449'],
      [1000000, '#239B56'],
      [5000000, '#27AE60'],
      [10000000, '#27AE60'],
      [20000000, '#7DCEA0'],
      [50000000, '#ABEBC6'],
    ],
  },
  'fill-opacity': 0.8,
  getItems: () => {
    return [
      { name: 'No Transaction', color: '#556A84' },
      { name: 'CHF 0-500k', color: '#186A3B' },
      { name: 'CHF 501k - 1mio', color: '#1E8449' },
      { name: 'CHF 1mio - 5mio', color: '#239B56' },
      { name: 'CHF 5mio - 10mio', color: '#27AE60' },
      { name: 'CHF 10mio - 20mio', color: '#7DCEA0' },
      { name: 'CHF 20mio - 50mio', color: '#ABEBC6' },
      { name: 'CHF 50mio+', color: '#D4EFDF' },
    ]
  },
}

export const PAINT_BY_STATUS = {
  'fill-outline-color': 'rgba(256,256,256,1)',
  'fill-color': [
    'match',
    ['get', 'STATUT_DA'],
    'ABANDONNE',
    '#FD6F38',
    'ABROGE',
    '#FD5F21',
    'ACCEPTE',
    '#FD500C',
    'ADOPTE',
    '#F34602',
    'ARCHANT',
    '#E14102',
    'ARCHIVE',
    '#D03C02',
    'CADUQUE',
    '#BF3702',
    'CHANTIER',
    '#B03302',
    'DECIDE',
    '#A22F02',
    'EDISCAN',
    '#952B02',
    'REFUSE',
    '#892802',
    'EN SUSPENS',
    '#FAD290',
    'ENREGISTRE',
    '#F9C877',
    'ENREGISTREMENT',
    '#F8BF60',
    'INSTRUCTION',
    '#F7B64A',
    'NON ASSUJETTI',
    '#F6AE36',
    'ORMIG',
    '#F5A623',
    'PREAVIS CM',
    '#F49E10',
    'PROCEDURE AMS',
    '#E7940B',
    'RECOURS',
    '#D78A0A',
    'RECOURS DA',
    '#C88009',
    'REFUS ENTREE',
    '#BA7708',
    'EN COURS',
    '#FCF5CC',
    'RENVOYE',
    '#F8E784',
    'TERMINE',
    '#F4CF10',
    'VA',
    '#E7C30B',
    '#556A84',
  ],
  'fill-opacity': 0.8,
  getItems: function () {
    const trimmedColors = this['fill-color'].slice(2).slice(0, -1)
    const notFoundItem = { name: 'Not found', color: '#556A84' }

    const result = trimmedColors
      .map((item, index) => {
        if (index % 2 === 0) {
          const firstLetter = item.slice(0, 1)
          const lowerItem =
            firstLetter.toUpperCase() + item.slice(1).toLowerCase()
          return {
            name: lowerItem,
            color: trimmedColors[index + 1],
          }
        }
        return null
      })
      .filter(item => item !== null)

    return [notFoundItem, ...result]
  },
}

export const PAINT_BY_ZONE = {
  'fill-color': [
    'match',
    ['get', 'NOM_ZONE'],
    'Zone 1',
    '#922B21',
    'Zone 2',
    '#F1948A',
    'Zone 3',
    '#F0B27A',
    'Zone 4A',
    '#AF601A',
    'Zone 4B',
    '#f6b855',
    'Zone 4B protégée',
    '#FAD7A0',
    'Zone 5',
    '#fbe69c',
    'Zone aéroportuaire',
    '#F5EEF8',
    "Zone affectée à de l'équipement public",
    '#ABB2B9',
    'Zone agricole',
    '#D4EFDF',
    'Zone de développement 2',
    '#F5B7B1',
    'Zone de développement 3',
    '#f4c69d',
    'Zone de développement 4A',
    '#d1731f',
    'Zone de développement 4A protégée',
    '#e18736',
    'Zone de développement 4B',
    '#f9cf8d',
    'Zone de développement 4B protégée',
    '#fce7c5',
    'Zone de développement 5',
    '#FEF9E7',
    "Zone de développement d'activités mixtes",
    '#8E44AD',
    'Zone de développement industriel et artisanal',
    '#D2B4DE',
    'Zone de hameaux',
    '#2C3E50',
    'Zone de jardins familiaux',
    '#A3E4D7',
    'Zone de protection de la nature et du paysage',
    '#D35400',
    'Zone de verdure',
    '#76ec8b',
    'Zone des bois et forêts',
    '#196F3D',
    'Zone des eaux et des rives',
    '#7FB3D5',
    'Zone ferroviaire',
    '#BFC9CA',
    'Zone industrielle et artisanale',
    '#ebddf0',
    'Zone sportive',
    '#c0dff4',
    '#556A84',
  ],
  getItems: function () {
    const trimmedColors = this['fill-color'].slice(2).slice(0, -1)
    const notFoundItem = { name: 'Not found', color: '#556A84' }

    const result = trimmedColors
      .map((item, index) => {
        if (index % 2 === 0) {
          return {
            name: item,
            color: trimmedColors[index + 1],
          }
        }
        return null
      })
      .filter(item => item !== null)
    return [notFoundItem, ...result]
  },
}
