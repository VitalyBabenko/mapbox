import axios from 'axios'

const url = 'https://777.adm-devs.com'

export const buildingService = {
  getByEgId: async egId => {
    try {
      const { data } = await axios.get(`${url}/api/map/buildings/${egId}`)

      return data.data
    } catch (error) {
      return {
        error,
      }
    }
  },
}
