import axios from "axios";

export const buildingsService = {
  getByEgrid: async (ergid) => {
    const { data } = await axios.get(
      `https://lamap-backend-bvaj6s5h2a-ew.a.run.app/api/plot/list?egrid=${ergid}&page=1&pageSize=1`
    );
    return data.plots[0];
  },
};
