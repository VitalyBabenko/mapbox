import { COUNTIES_SOURCE } from '../constants'

export const getCountyByName = (map, countyName) => {
  if (!map || !countyName) return

  const features = map.querySourceFeatures(COUNTIES_SOURCE.id, {
    sourceLayer: COUNTIES_SOURCE.sourceLayer,
    filter: ['==', ['get', 'COMMUNE'], countyName],
  })

  return features[0]
}
