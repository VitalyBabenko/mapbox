import axios from "axios";

const filterUrl = "https://777.adm-devs.com/api/filters";

export const filterService = {
  getPlotsFilters: async () => {
    try {
      const { data } = await axios.get(filterUrl);

      console.log(data);

      const plotsFilters = data
        .filter((item) => {
          if (item.view === "checkbox") return false;
          if (item.level === "plots") return true;
          if (item.level === "plots_and_buildings") return true;
          return false;
        })
        .sort((a, b) => a.position - b.position)
        .sort((a, b) => b.show_on_top - a.show_on_top);

      const getCheckboxList = () => {
        return data.filter((item) => {
          return (
            (item.level === "plots" || item.level === "plots_and_buildings") &&
            item.view === "checkbox"
          );
        });
      };

      return { list: plotsFilters, getCheckboxList };
    } catch (error) {
      return {
        error,
      };
    }
  },
};
