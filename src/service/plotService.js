import axios from 'axios'

const url = 'https://777.adm-devs.com'

export const plotService = {
  getPlotByEgrId: async ergid => {
    try {
      const resp = await axios.get(`${url}/api/map/plots/${ergid}`)

      const plot = resp.data.data

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
  addToEmailAlerts: async plotId => {
    const { data } = await axios.post(`${url}/user/2/plot/${plotId}/alert`)
  },

  removeEmailAlerts: async plotId => {
    const { data } = await axios.delete(`${url}/user/2/plot/${plotId}/alert`)
  },

  getEmailAlerts: async plotId => {
    const { data } = await axios.get(`${url}/user/2/alerts/all/${plotId}`)

    return data
  },

  addToBookmarksAlerts: async plotId => {
    const { data } = await axios.post(`${url}/user/2/plot/${plotId}/bookmark`)
  },

  removeBookmarksAlerts: async plotId => {
    const { data } = await axios.delete(`${url}/user/2/plot/${plotId}/bookmark`)
  },

  getBookmarksAlerts: async plotId => {
    const { data } = await axios.get(`${url}/user/2/bookmarks/all/${plotId}`)

    return data
  },

  getAllNotes: async plotId => {
    const { data } = await axios.get(`${url}/user/2/notes/all/${plotId}`)

    return data
  },

  addPlotNote: async (plotId, text) => {
    const formData = new URLSearchParams()
    formData.append('content', text)

    await axios.post(`${url}/user/2/plot/${plotId}/note`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  },

  removePlotNote: async (plotId, noteId) => {
    const { data } = await axios.delete(
      `${url}/user/2/plot/${plotId}/note/${noteId}`,
    )
  },
}
