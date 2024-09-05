import axios from 'axios'
import axiosInstance from './axiosInstance'

const url = 'https://777.adm-devs.com'

export const plotService = {
  getPlotByEgrId: async ergid => {
    try {
      const resp = await axios.get(`${url}/api/map/plots/${ergid}`)

      const plot = resp?.data?.data

      if (!plot) throw new Error()

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

  // email alerts
  getEmailAlerts: async plotId => {
    const resp = await axiosInstance.get(`/user/alerts/all/${plotId}`)
    if (!Array.isArray(resp?.data?.alerts)) {
      throw new Error()
    }
    return resp.data.alerts
  },

  addToEmailAlerts: async plotId => {
    const resp = await axiosInstance.post(`/user/plot/${plotId}/alert`)
    if (!resp?.data?.result) {
      throw new Error()
    }
    return resp.data
  },

  removeEmailAlerts: async plotId => {
    const resp = await axiosInstance.delete(`/user/plot/${plotId}/alert`)
    if (!resp?.data?.result) {
      throw new Error()
    }
    return resp.data
  },

  // bookmarks
  getBookmarksAlerts: async plotId => {
    const resp = await axiosInstance.get(`/user/bookmarks/all/${plotId}`)
    if (!Array.isArray(resp?.data?.bookmarks)) {
      throw new Error()
    }
    return resp.data.bookmarks
  },

  addToBookmarksAlerts: async plotId => {
    const resp = await axiosInstance.post(`/user/plot/${plotId}/bookmark`)
    if (!resp?.data?.result) {
      throw new Error()
    }
    return resp.data
  },

  removeBookmarksAlerts: async plotId => {
    const resp = await axiosInstance.delete(`/user/plot/${plotId}/bookmark`)
    if (!resp?.data?.result) {
      throw new Error()
    }
    return resp.data
  },

  // notes
  getAllNotes: async plotId => {
    const resp = await axiosInstance.get(`/user/notes/all/${plotId}`)
    if (!Array.isArray(resp?.data?.notes)) {
      throw new Error()
    }
    return resp.data
  },

  addNote: async (plotId, text) => {
    const formData = new URLSearchParams()
    formData.append('content', text)

    const resp = await axiosInstance.post(
      `/plot/${plotId}/user/note`,
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    if (!resp?.data?.result) {
      throw new Error()
    }
    return resp.data
  },

  removeNote: async (plotId, noteId) => {
    const resp = await axiosInstance.delete(
      `/user/plot/${plotId}/note/${noteId}`,
    )
    if (!resp?.data?.result) {
      throw new Error()
    }
    return resp.data
  },

  getFilters: async () => {
    try {
      const lang = document.querySelector('html').lang
      const { data } = await axios.get(`${url}/api/filters/plots?lang=${lang}`)

      const plotsFilters = data.data
        .filter(item => item.view !== 'checkbox')
        .sort((a, b) => a.position - b.position)
        .sort((a, b) => b.show_on_top - a.show_on_top)

      const checkboxes = data.data.filter(item => {
        return item.view === 'checkbox'
      })

      return { list: plotsFilters, checkboxes }
    } catch (error) {
      return {
        error,
      }
    }
  },

  setFilters: async filters => {
    try {
      const { data } = await axios.get(`${url}/api/map/plots`, {
        params: filters,
      })

      return data
    } catch (error) {
      return {
        error,
      }
    }
  },
}
