import { MAP_STYLES } from './mapStyles'
import {
  COUNTIES_SOURCE,
  PLOTS_SOURCE,
  BUILDINGS_SOURCE,
  ZONES_SOURCE,
  PROTECTED_SOURCE,
  POOLS_SOURCE,
} from './mapSources'
import {
  DEFAULT_PAINT,
  PAINT_BY_TYPE,
  PAINT_BY_APARTS_QTY,
  PAINT_BY_CONSTRUCTION_PERIOD,
  PAINT_BY_LAST_TRANSACTION,
  PAINT_BY_TRANSACTION_AMOUNT,
  PAINT_BY_STATUS,
  PAINT_BY_ZONE,
  PAINT_BY_ENERGY,
} from './paints'

export const INITIAL_VIEW = {
  LONGITUDE: 6.143724445834019,
  LATITUDE: 46.203988837044086,
  ZOOM: 10.5,
}

export const MODES = {
  COUNTIES: 'counties',
  BUILDINGS: 'buildings',
  PLOTS: 'plots',
  PROTECTED: 'protected',
  FILTER: 'filter',
  TAGS: 'tags',
  BOOKMARKS: 'bookmarks',
}

export const DEFAULT_TAG_COLORS = [
  '#006cd5',
  '#58DCA6',
  '#D60E00',
  '#8523FD',
  '#FBB43F',
  '#85C1E9',
]

export const INTERACTIVE_LAYER_IDS = [
  'counties',
  'plots',
  'buildings',
  'protected',
  'filteredPlots',
  'filteredBuildings',
  'pools',
  'tagsLayer',
  'notesLayer',
  'alertsLayer',
  'bookmarksLayer',
]

export {
  MAP_STYLES,
  COUNTIES_SOURCE,
  PLOTS_SOURCE,
  BUILDINGS_SOURCE,
  ZONES_SOURCE,
  PROTECTED_SOURCE,
  POOLS_SOURCE,
  DEFAULT_PAINT,
  PAINT_BY_TYPE,
  PAINT_BY_APARTS_QTY,
  PAINT_BY_CONSTRUCTION_PERIOD,
  PAINT_BY_LAST_TRANSACTION,
  PAINT_BY_TRANSACTION_AMOUNT,
  PAINT_BY_STATUS,
  PAINT_BY_ZONE,
  PAINT_BY_ENERGY,
}
