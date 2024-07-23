import axios from 'axios'

const url = 'https://777.adm-devs.com'

export const buildingService = {
  getByEgId: async egId => {
    try {
      const { data } = await axios.get(`${url}/api/map/buildings/${egId}`)

      const info = data.data

      info.getOwners = function () {
        if (!this?.plot?.ownership_info) return null
        return this.plot?.ownership_info.map(item => item?.owner_info)
      }

      info.getZone = function () {
        if (!this?.plot?.zone) return null
        return this.plot?.zone
      }

      info.getTransactions = function () {}

      return info
    } catch (error) {
      return {
        error,
      }
    }
  },
}
