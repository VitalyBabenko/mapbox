import axios from "axios";

const filterUrl = "https://777.adm-devs.com/api/filters";

export const filterService = {
  getPlotsFilters: async () => {
    try {
      const { data } = await axios.get(filterUrl);

      const plotsFilters = data.filter((item) => {
        if (item.level === "plots") return true;
        if (item.level === "plots_and_buildings") return true;
        return false;
      });

      const top = plotsFilters
        .filter((item) => item.show_on_top === 1)
        .sort((a, b) => a.position - b.position);

      const bottom = plotsFilters
        .filter((item) => item.show_on_top !== 1)
        .sort((a, b) => a.position - b.position);

      return { top, bottom };
    } catch (error) {
      return {
        error,
      };
    }
  },
};
