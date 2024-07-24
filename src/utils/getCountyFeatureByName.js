export const getCountyFeatureByName = (countyName, allCountiesFeatures) => {
  if (!countyName) return null

  if (countyName?.slice(0, 6) === 'Genève') {
    const genevaCounty = allCountiesFeatures?.find(
      county => county.properties.gdname[0] === '[',
    )
    return genevaCounty
  }

  return allCountiesFeatures?.find(
    county => county.properties.gdname === countyName,
  )
}
