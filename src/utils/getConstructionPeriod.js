export const getConstructionPeriod = str => {
  if (!str) return 0
  const numbers = str?.match(/\d+/g)?.map(Number)

  if (numbers?.length === 1) {
    return numbers[0]
  }

  if (numbers?.length === 2) {
    const [year1, year2] = numbers
    const average = (year1 + year2) / 2

    return average
  }

  return 0
}
