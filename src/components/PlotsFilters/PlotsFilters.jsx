import { useEffect, useRef, useState } from "react";
import { selectStyles } from "../../styles/selectStyles";
import Loader from "../Loader/Loader.jsx";
import style from "./PlotsFilters.module.scss";

import { IoFilter as FilterIcon } from "react-icons/io5";
import { AiOutlineClose as CrossIcon } from "react-icons/ai";
import GeocoderControl from "../GeocoderControl/GeocoderControl";
import Checkbox from "../Checkbox/Checkbox";
import Select from "react-select";
import { FILTERS_OPTIONS } from "../../constants/index.js";
import "react-datepicker/dist/react-datepicker.css";
import { TbMeterSquare as MeterSquareIcon } from "react-icons/tb";
import { filterService } from "../../service/filterService.js";
import RangeFilter from "../Filters/RangeFilter/RangeFilter.jsx";
import DateFilter from "../Filters/DateFilter/DateFilter.jsx";

import CheckboxListFilter from "../Filters/CheckboxListFilter/CheckboxListFilter.jsx";
import MultiSelectFilter from "../Filters/MultiSelectFilter/MultiSelectFilter.jsx";
import TypeaheadFilter from "../Filters/TypeaheadFilter/TypeaheadFilter.jsx";

const PlotsFilters = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const handleSubmit = (e) => {};

  useEffect(() => {
    const getFilters = async () => {
      setIsLoading(true);
      const resp = await filterService.getPlotsFilters();
      // console.log(resp);
      setFilters(resp);
      setIsLoading(false);
    };

    getFilters();
  }, []);

  if (!open)
    return (
      <button className={style.openBtn} onClick={toggleOpen}>
        <FilterIcon />
        Filters
      </button>
    );

  if (isLoading) {
    return (
      <div className={style.filtersPopup}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={style.filtersPopup}>
      <div className={style.top}>
        <FilterIcon className={style.filterIcon} />
        <h2>Filters</h2>

        <CrossIcon size={24} className={style.closeBtn} onClick={toggleOpen} />
      </div>

      <form onSubmit={handleSubmit}>
        <CheckboxListFilter checkboxes={filters.getCheckboxList()} />

        {filters.list.map((filter) => {
          if (filter.view === "typeahead_input")
            return <TypeaheadFilter filter={filter} />;
          return null;
        })}

        {/* <h3>Canton</h3>
        <Select
          name="canton"
          className={style.select}
          styles={selectStyles}
          options={FILTERS_OPTIONS.CANTON}
          getOptionValue={(option) => setCanton(option.value)}
        />

        <h3>Post code</h3>
        <Select
          name="postCode"
          ref={postCodeRef}
          isMulti
          options={FILTERS_OPTIONS.POST_CODE}
          styles={selectStyles}
        />

        <h3>Locality</h3>
        <Select
          name="locality"
          ref={localityRef}
          isMulti
          options={FILTERS_OPTIONS.LOCALITY}
          styles={selectStyles}
        />

        <DateFilter
          label="Request Submitted On"
          startValue={requestStart}
          setStartValue={setRequestStart}
          endValue={requestEnd}
          setEndValue={setRequestEnd}
        />

        <h3>File Number</h3>
        <input type="text" />

        <h3>File status</h3>
        <Select
          name="fileStatus"
          isMulti
          options={FILTERS_OPTIONS.FILE_STATUS}
          styles={selectStyles}
        />

        <h3>Commune</h3>
        <Select
          name="commune"
          isMulti
          options={FILTERS_OPTIONS.COMMUNE}
          styles={selectStyles}
        />

        <h3>Address</h3>
        <input />

        <RangeFilter
          label="Plot Surface"
          icon={<MeterSquareIcon />}
          value={surface}
          setValue={setSurface}
          min={0}
          max={4912723}
        />

        <h3>Name</h3>
        <input />

        <RangeFilter
          label="Age"
          value={age}
          setValue={setAge}
          min={0}
          max={157}
        />

        <h3>Maiden Name</h3>
        <input />

        <h3>Transaction Type</h3>
        <Select
          name="transactionType"
          isMulti
          options={FILTERS_OPTIONS.TRANSACTION_TYPE}
          styles={selectStyles}
        /> */}

        <button type="submit">Apply</button>
      </form>

      <GeocoderControl
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        position="top-left"
      />
    </div>
  );
};

export default PlotsFilters;
