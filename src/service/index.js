import axios from "axios";

export const service = {
  getPlotByEgrId: async (ergid) => {
    try {
      const { data } = await axios.get(
        `https://lamap-backend-bvaj6s5h2a-ew.a.run.app/api/plot/list?egrid=${ergid}&page=1&pageSize=1`
      );

      const dbPlot = data?.plots[0];

      const livingSurface =
        dbPlot?.addresses?.reduce((acc, item) => {
          acc += +item?.surface_brut_de_plancher_hors_sol_m2 || 0;
          return +acc;
        }, 0) || null;

      const plotInfo = {
        id: dbPlot?._id || null,
        number: dbPlot?.no_commune_no_parcelle || null,
        city: dbPlot?.canton_name || null,
        commune: dbPlot?.commune_name || null,
        type: dbPlot?.type || null,
        zone: dbPlot?.zone || null,
        isPpe: !!dbPlot?.ppe,
        surface: dbPlot?.surface_parcelle_m2 || null,
        livingSurface,
        owners: dbPlot?.ownership_info?.map((info) => info?.owner),
        buildings: dbPlot?.addresses?.map(
          (address) => address?.housing_stats_data
        ),
      };

      console.log({ db: dbPlot, plotInfo });

      return plotInfo;
    } catch (error) {
      return {
        error,
      };
    }
  },
};
