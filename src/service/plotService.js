import axios from 'axios'

const filterUrl = 'https://777.adm-devs.com'

export const plotService = {
  addToEmailAlerts: async (plotId) => {
    const { data } = await axios.post(`${filterUrl}/user/2/plot/${plotId}/alert`)
  },

  removeEmailAlerts: async (plotId) => {
    const { data } = await axios.delete(`${filterUrl}/user/2/plot/${plotId}/alert`)
  },

  getEmailAlerts: async (plotId) => {
    const { data } = await axios.get(`${filterUrl}/user/2/alerts/all/${plotId}`)

    return data
  },

  addToBookmarksAlerts: async (plotId) => {
    const { data } = await axios.post(`${filterUrl}/user/2/plot/${plotId}/bookmark`)
  },

  removeBookmarksAlerts: async (plotId) => {
    const { data } = await axios.delete(`${filterUrl}/user/2/plot/${plotId}/bookmark`)
  },

  getBookmarksAlerts: async (plotId) => {
    const { data } = await axios.get(`${filterUrl}/user/2/bookmarks/all/${plotId}`)

    return data
  },

  getAllNotes: async (plotId) => {
    const { data } = await axios.get(`${filterUrl}/user/2/notes/all/${plotId}`)

    return data
  },

  addPlotNote: async (plotId, text) => {
    const formData = new URLSearchParams()
    formData.append('content', text)

    await axios.post(`${filterUrl}/user/2/plot/${plotId}/note`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  },

  removePlotNote: async (plotId, noteId) => {
    const { data } = await axios.delete(`${filterUrl}/user/2/plot/${plotId}/note/${noteId}`)
  },
}
