import axios from 'axios'

const url = 'https://777.adm-devs.com'

export const buildingService = {
  getByEgId: async egId => {
    try {
      const resp = await axios.get(`${url}/api/map/buildings/${egId}`)

      const info = resp.data.data

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
      const { data } = await axios.get(`${url}/api/filters`)

      const buildingsFilters = data
        .filter(item => {
          if (item.view === 'checkbox') return false
          if (item.level?.includes('buildings')) return true

          return false
        })
        .sort((a, b) => a.position - b.position)
        .sort((a, b) => b.show_on_top - a.show_on_top)

      const checkboxes = data.filter(item => {
        return item.level?.includes('buildings') && item.view === 'checkbox'
      })

      return { list: buildingsFilters, checkboxes }
    } catch (error) {
      return {
        error,
      }
    }
  },

  setBuildingsFilters: async filters => {
    try {
      const { data } = await axios.get(`${url}/api/map/buildings`, {
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
