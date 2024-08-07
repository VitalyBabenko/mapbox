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
}
