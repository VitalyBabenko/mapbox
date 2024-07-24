import axios from 'axios'

const filterUrl = 'https://777.adm-devs.com/api'

export const filterService = {
  getPlotsFilters: async () => {
    try {
      const { data } = await axios.get(`${filterUrl}/filters`)

      const plotsFilters = data
        .filter(item => {
          if (item.view === 'checkbox') return false
          if (item.level?.includes('plots')) return true
          if (item.level?.includes('plots_and_buildings')) return true
          return false
        })
        .sort((a, b) => a.position - b.position)
        .sort((a, b) => b.show_on_top - a.show_on_top)

      const checkboxes = data.filter(item => {
        return (
          (item.level?.includes('plots') ||
            item.level?.includes('plots_and_buildings')) &&
          item.view === 'checkbox'
        )
      })

      return { list: plotsFilters, checkboxes }
    } catch (error) {
      return {
        error,
      }
    }
  },

  setPlotsFilters: async filters => {
    try {
      const { data } = await axios.get(`${filterUrl}/map/plots`, {
        params: filters,
      })

      return data
    } catch (error) {
      return {
        error,
      }
    }
  },

  getBuildingsFilters: async () => {
    try {
      const { data } = await axios.get(`${filterUrl}/filters`)

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
      const { data } = await axios.get(`${filterUrl}/map/buildings`, {
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
