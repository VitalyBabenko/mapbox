import axiosInstance from './axiosInstance'
import { MockData } from './mock'

export const plotService = {
  getPlotByEgrId: async ergid => {
    try {
      const resp = await axiosInstance.get(`/api/map/plots/${ergid}`)

      const plot = resp?.data?.data

      if (!plot) throw new Error()

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

  getAllPlotsFeaturesWithAlerts: async () => {
    if (window.location.hostname === 'localhost') {
      return MockData.getAlertedPlots()
    }

    try {
      const resp = await axiosInstance.get(`/user/alerts/geo-json`)
      return resp?.data
    } catch (error) {
      return {
        type: 'FeatureCollection',
        features: [],
      }
    }
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

  getAllPlotsFeaturesWithBookmarks: async () => {
    if (window.location.hostname === 'localhost') {
      return MockData.getBookmarkedPlots()
    }

    try {
      const resp = await axiosInstance.get(`/user/bookmarks/geo-json`)

      return resp.data
    } catch (error) {
      return {
        type: 'FeatureCollection',
        features: [],
      }
    }
  },

  // tags
  getAllTagTitles: async () => {
    try {
      const resp = await axiosInstance.get(`/user/tags/titles`)
      if (!Array.isArray(resp?.data?.tags)) {
        throw new Error()
      }
      return resp.tags
    } catch (error) {
      return {
        error,
      }
    }
  },

  assignTagToPlot: async ({ plotId, tag, color }) => {
    const resp = await axiosInstance.post(`/user/plot/${plotId}/tag`, null, {
      params: {
        title: tag,
        color: encodeURIComponent(color),
      },
    })

    if (!resp?.data?.result) {
      throw new Error()
    }
    return resp?.data
  },

  getAllPlotsFeaturesWithTags: async () => {
    if (window.location.hostname === 'localhost') {
      return MockData.getTaggedPlots()
    }

    try {
      const resp = await axiosInstance.get(`/user/tags/geo-json`)
      return resp?.data
    } catch (error) {
      return {
        type: 'FeatureCollection',
        features: [],
      }
    }
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
      `/user/plot/${plotId}/note`,
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

  removeNote: async noteId => {
    const resp = await axiosInstance.delete(`/user/notes/${noteId}`)
    if (!resp?.data?.result) {
      throw new Error()
    }
    return resp.data
  },

  getAllPlotsFeaturesWithNotes: async () => {
    if (window.location.hostname === 'localhost') {
      return MockData.getNotedPlots()
    }

    try {
      const resp = await axiosInstance.get(`/user/notes/geo-json`)
      return resp?.data
    } catch (error) {
      return {
        type: 'FeatureCollection',
        features: [],
      }
    }
  },

  getFilters: async () => {
    try {
      const lang = document.querySelector('html').lang
      const { data } = await axiosInstance.get(
        `/api/filters/plots?lang=${lang}`,
      )

      const filtersByCategory = Object.entries(
        data.data.reduce((acc, item) => {
          const key = item.category_title
          if (key === null) return acc

          if (!acc[key]) {
            acc[key] = []
          }

          acc[key].push(item)

          return acc
        }, {}),
      ).map(([category, items]) => ({
        title: category,
        filters: items,
      }))

      return { filtersByCategory, filters: data.data }
    } catch (error) {
      return {
        error,
      }
    }
  },

  setFilters: async (filters, controller) => {
    try {
      const { data } = await axiosInstance.get(`/api/map/plots`, {
        params: filters,
        signal: controller.signal,
      })

      return data
    } catch (error) {
      return {
        error,
      }
    }
  },
}
