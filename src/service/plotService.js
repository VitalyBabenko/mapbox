import axios from 'axios'
import axiosInstance from './axiosInstance'

const url = 'https://panel.lamap.ch'

const testTagsData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6.182114565369483, 46.19427221991906],
            [6.182120649410944, 46.19426985227062],
            [6.18212672839579, 46.19426747916747],
            [6.18213280363995, 46.19426509972458],
            [6.182138873806717, 46.19426271572649],
            [6.182144940253623, 46.194260324489214],
            [6.182151000327919, 46.194257928682255],
            [6.182157056640755, 46.19425552743502],
            [6.18216310791774, 46.19425311983365],
            [6.182169155454032, 46.19425070589258],
            [6.182175197912974, 46.19424828739621],
            [6.182181235336011, 46.19424586254575],
            [6.182187267681644, 46.19424343314009],
            [6.182193295012146, 46.19424099648073],
            [6.182199318560451, 46.19423855528066],
            [6.182205337072896, 46.194236107726375],
            [6.182211350507932, 46.194233655616905],
            [6.182217360202267, 46.19423119716771],
            [6.182223363565529, 46.19422873234994],
            [6.18222936314659, 46.1942262629914],
            [6.1822353576917335, 46.19422378727867],
            [6.182241347180287, 46.19422130611129],
            [6.182247331612151, 46.194218819489194],
            [6.182253312282528, 46.194216327426865],
            [6.1822592866218775, 46.194213828995984],
            [6.182265257178968, 46.19421132602429],
            [6.1822712227001855, 46.19420881669846],
            [6.182495635664063, 46.19409226377865],
            [6.182853824054524, 46.19442645346428],
            [6.182875687964284, 46.19444690986919],
            [6.1826343956968435, 46.19456056848618],
            [6.182476700635324, 46.19463578509299],
            [6.182114565369483, 46.19427221991906],
          ],
        ],
      },
      properties: {
        PLOT_ID: 12041,
        EGRID: 'CH728846656344',
        COMMUNE: 'Chêne-Bougeries',
        NO_COMM: 12,
        NO_PARCELL: 1413,
        IDEDDP: '12:1413',
        SURFACE: 1771,
        PROVENANCE: 'terrestre',
        VALIDITE: 'en vigueur',
        TYPE_PROPR: 'privé',
        TYPOLOGIE: 'Habitation un logement',
        EPOQUE: '1961 à 1970',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6.204314039045404, 46.194471815139174],
            [6.204295952138318, 46.19451515680325],
            [6.204070881369315, 46.194624072060435],
            [6.203616117041, 46.19476556122147],
            [6.203562744620344, 46.19478224963383],
            [6.20385244445712, 46.19520577106003],
            [6.204076640128897, 46.19553324654425],
            [6.204141828559923, 46.195628959866966],
            [6.2035429284888055, 46.19580839928624],
            [6.203365453815468, 46.19578476485744],
            [6.20333288156709, 46.19573043147632],
            [6.202761599644552, 46.19478806660729],
            [6.202773841985508, 46.194785232722204],
            [6.2025626475404705, 46.194433232520666],
            [6.202683849481521, 46.194396412743025],
            [6.202903688425313, 46.1943296357048],
            [6.203192559175752, 46.19424103079777],
            [6.2031941897940595, 46.194243388702475],
            [6.203294248752534, 46.19438635553713],
            [6.203750102786397, 46.19424766771214],
            [6.204008298694692, 46.194169071132634],
            [6.204314039045404, 46.194471815139174],
          ],
        ],
      },
      properties: {
        PLOT_ID: 56913,
        EGRID: 'CH736588631863',
        COMMUNE: 'Thônex',
        NO_COMM: 43,
        NO_PARCELL: 5817,
        IDEDDP: '43:5817',
        SURFACE: 12868,
        PROVENANCE: 'terrestre',
        VALIDITE: 'en vigueur',
        TYPE_PROPR: 'privé',
        TYPOLOGIE: 'Ecole primaire',
        EPOQUE: '2006 à 2010',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6.143225674749553, 46.16019712095979],
            [6.14275653838434, 46.15996372831873],
            [6.142435660455585, 46.15974725390333],
            [6.142746183637763, 46.15947958097049],
            [6.143138158421749, 46.15946106163861],
            [6.143230039949516, 46.159517357914176],
            [6.143267065002052, 46.159539376611896],
            [6.143268778512987, 46.159538044981275],
            [6.143386755599635, 46.159607597288165],
            [6.143373683385008, 46.15961824325833],
            [6.143442148177268, 46.15965744716515],
            [6.143502056896623, 46.1596917844225],
            [6.143497954066895, 46.15969542597672],
            [6.14359705350624, 46.159753064423704],
            [6.143547919076103, 46.1597938852711],
            [6.143494425427184, 46.15983834560634],
            [6.143467807792985, 46.159874298730216],
            [6.143422223412522, 46.15993486512051],
            [6.143225674749553, 46.16019712095979],
          ],
        ],
      },
      properties: {
        PLOT_ID: 57961,
        EGRID: 'CH546365895007',
        COMMUNE: 'Troinex',
        NO_COMM: 44,
        NO_PARCELL: 10533,
        IDEDDP: '44:10533',
        SURFACE: 4154,
        PROVENANCE: 'terrestre',
        VALIDITE: 'en vigueur',
        TYPE_PROPR: 'privé',
        TYPOLOGIE: 'Habitation un logement',
        EPOQUE: 'avant 1919',
      },
    },
  ],
}

export const plotService = {
  getPlotByEgrId: async ergid => {
    try {
      const resp = await axios.get(`${url}/api/map/plots/${ergid}`)

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
    try {
      // const resp = await axiosInstance.get(`/user/tags/geo-json`)

      return testTagsData
      // return resp?.data
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
      const { data } = await axios.get(`${url}/api/map/plots`, {
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
