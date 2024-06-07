import style from "./BuildingsList.module.scss";

const BuildingsList = ({ buildings }) => {
  const constructionField = (minYear, maxYear) => {
    if (!minYear) return null;
    if (!maxYear) return null;

    return (
      <p>
        Construction year: <span>{maxYear}</span>
      </p>
    );
  };

  if (!buildings) return null;
  return (
    <ul className={style.list}>
      {buildings.map((building, i) => (
        <li key={building?.egrid && i} className={style.buildingItem}>
          <div className={style.buildingItemLeft}>
            {building?.no_batiment && (
              <p>
                Building number: <span>{building.no_batiment}</span>
              </p>
            )}

            {building?.egid && (
              <p>
                EGID: <span>{building?.egid}</span>
              </p>
            )}

            {building?.surface_totale_des_logements_du_batiment_m2 ? (
              <p>
                Living Surface:{" "}
                <span>
                  {" "}
                  {building.surface_totale_des_logements_du_batiment_m2}m²
                </span>
              </p>
            ) : null}

            {constructionField(
              building?.min_building_construction_year,
              building?.max_building_construction_year
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BuildingsList;
