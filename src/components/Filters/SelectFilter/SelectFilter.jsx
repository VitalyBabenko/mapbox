import React, { useState } from "react";
import Select from "react-select";
import style from "./SelectFilter.module.scss";
import { FILTERS_OPTIONS } from "../../../constants";
import { selectStyles } from "../../../styles/selectStyles";

const SelectFilter = ({ filter }) => {
  return (
    <>
      <h3>Canton</h3>
      <Select
        name="canton"
        className={style.select}
        styles={selectStyles}
        options={FILTERS_OPTIONS.CANTON}
      />
    </>
  );
};

export default SelectFilter;
