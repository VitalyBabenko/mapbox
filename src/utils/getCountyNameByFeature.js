export const getCountyNameByFeature = county => {
  if (county?.properties?.gdname?.[0] === '[') {
    const arr = JSON.parse(county?.properties?.gdname)
    return arr?.join(', ')
  }
  return county?.properties?.gdname
}
