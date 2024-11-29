import axios from 'axios'

const url = 'https://panel.lamap.ch'

export const buildingService = {
  getByEgId: async egId => {
    try {
      const resp = await axios.get(`${url}/api/map/buildings/${egId}`)

      const info = resp.data.data

      if (info.length === 0) throw new Error('error')

      info.getOwners = function () {
        if (!this?.plot?.ownership_info) return null
        return this.plot?.ownership_info.map(item => item?.owner_info)
      }

      info.getExtendedInfo = function () {
        if (!this?.plot?.addresses?.length) return null
        return this.plot.addresses.find(
          item => item.adresse === this?.address_name?.toLowerCase(),
        )
      }

      return info
    } catch (error) {
      return {
        error,
      }
    }
  },

  getFilters: async () => {
    try {
      const lang = document.querySelector('html').lang
      const { data } = await axios.get(
        `${url}/api/filters/buildings?lang=${lang}`,
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
      const { data } = await axios.get(`${url}/api/map/buildings`, {
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
