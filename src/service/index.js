import axios from 'axios'

const url = 'https://777.adm-devs.com'

export const service = {
  getPlotByEgrId: async ergid => {
    try {
      const resp = await axios.get(`${url}/api/map/plots/${ergid}`)

      const plot = resp.data.data

      plot.getOwners = function () {
        return this.ownership_info.map(info => info.owner)
      }
      plot.getTransactions = function () {
        return this.ownership_info
          .map(info => info.last_transaction)
          .filter(transaction => !!transaction?._id)
      }

      plot.getBuildings = function () {
        const result = []
        this?.addresses?.forEach(address => {
          if (address?.housing_stats_data) {
            result.push(address?.housing_stats_data)
          }
        })
        return result
      }

      plot.getLivingSurface = function () {
        return (
          this?.addresses?.reduce((acc, item) => {
            acc += +item?.surface_brut_de_plancher_hors_sol_m2 || 0
            return +acc
          }, 0) || null
        )
      }

      return plot
    } catch (error) {
      return {
        error,
      }
    }
  },
}
