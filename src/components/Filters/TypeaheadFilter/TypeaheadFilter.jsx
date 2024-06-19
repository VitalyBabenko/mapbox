import React, { useState } from "react";
import style from "./TypeaheadFilter.module.scss";
import { Typeahead } from "react-bootstrap-typeahead";

const TypeaheadFilter = ({ filter }) => {
  const [selected, setSelected] = useState([]);

  const options = filter.values.map((value) => ({
    label: value,
  }));

  return (
    <>
      <h3>{filter.title}</h3>

      <Typeahead
        onChange={setSelected}
        options={options}
        selected={selected}
        maxResults={10}
        className={style.typeahead}
      />
    </>
  );
};

export default TypeaheadFilter;
