const BuildingsList = ({ buildings }) => {
  const constructionField = (minYear, maxYear) => {
    if (!minYear) return null;
    if (!maxYear) return null;

    return (
      <p>
        Construction year: <b>{maxYear}</b>
      </p>
    );
  };

  if (!buildings) return null;
  return (
    <ul style={{ marginTop: "16px" }}>
      {buildings.map((building, i) => (
        <li key={building?.egrid && i}>
          {building?.no_batiment && (
            <p>
              Building number: <b>{building.no_batiment}</b>
            </p>
          )}

          {building?.egid && (
            <p>
              EGID: <b>{building?.egid}</b>
            </p>
          )}

          {building?.surface_totale_des_logements_du_batiment_m2 ? (
            <p>
              Living Surface:{" "}
              <b> {building.surface_totale_des_logements_du_batiment_m2}m²</b>
            </p>
          ) : null}

          {constructionField(
            building?.min_building_construction_year,
            building?.max_building_construction_year
          )}
        </li>
      ))}
    </ul>
  );
};

export default BuildingsList;
