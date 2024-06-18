import { useRef, useState } from "react";
import { selectStyles } from "../../styles/selectStyles";
import style from "./PlotsFilters.module.scss";

import { IoFilter as FilterIcon } from "react-icons/io5";
import { AiOutlineClose as CrossIcon } from "react-icons/ai";
import GeocoderControl from "../GeocoderControl/GeocoderControl";
import Checkbox from "../Checkbox/Checkbox";
import Select from "react-select";
import { FILTERS_OPTIONS } from "../../constants/index.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiCalendarAlt as CalendarIcon } from "react-icons/bi";

const PlotsFilters = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const [canton, setCanton] = useState("");
  const postCodeRef = useRef(null);
  const localityRef = useRef(null);
  const [requestStart, setRequestStart] = useState(null);
  const [requestEnd, setRequestEnd] = useState(null);

  // const [request, setRequest] = useState(null);
  // const [fileNumber, setFileNumber] = useState("");
  // const [fileStatus, setFileStatus] = useState("");
  // const [commune, setCommune] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    const isSAD = target[0].checked;
    const isPPE = target[1].checked;
    // canton
    const postCode =
      postCodeRef.current.props.value?.map((item) => item.value) || [];
    const locality =
      localityRef.current.props.value?.map((item) => item.value) || [];

    console.log({ isSAD, canton, isPPE, postCode, locality });
  };

  return (
    <>
      <button className={style.openBtn} onClick={toggleOpen}>
        <FilterIcon />
        Filters
      </button>

      {open && (
        <div className={style.filtersPopup}>
          <div className={style.top}>
            <FilterIcon className={style.filterIcon} />
            <h2>Filters</h2>

            <CrossIcon
              size={24}
              className={style.closeBtn}
              onClick={toggleOpen}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <h3>Type</h3>
            <div className={style.type}>
              <Checkbox label="SAD" />
              <Checkbox label="PPE" />
            </div>

            <h3>Canton</h3>
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

            <h3>Request Submitted On</h3>
            <div className={style.requestSubmittedOn}>
              <DatePicker
                placeholderText="From"
                showIcon
                icon={<CalendarIcon className={style.calendarIcon} />}
                toggleCalendarOnIconClick={true}
                selected={requestStart}
                onChange={(date) => setRequestStart(date)}
                selectsStart
                startDate={requestStart}
                endDate={requestEnd}
                wrapperClassName={style.calendarInputWrapper}
                calendarClassName={style.requestStart}
              />

              <DatePicker
                placeholderText="To"
                showIcon
                icon={<CalendarIcon className={style.calendarIcon} />}
                toggleCalendarOnIconClick={true}
                selected={requestEnd}
                onChange={(date) => setRequestEnd(date)}
                selectsEnd
                startDate={requestStart}
                endDate={requestEnd}
                wrapperClassName={style.calendarInputWrapper}
                calendarClassName={style.requestEnd}
              />
            </div>

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

            <h3>Plot Surface</h3>
            <div className={style.plotSurface}>
              <input />
              <input />
            </div>

            <h3>Name</h3>
            <input />

            <h3>Age</h3>
            <div className={style.age}>
              <input />
              <input />
            </div>

            <h3>Maiden Name</h3>
            <input />

            <h3>Transaction Type</h3>
            <Select
              name="transactionType"
              isMulti
              options={FILTERS_OPTIONS.TRANSACTION_TYPE}
              styles={selectStyles}
            />

            <button type="submit">Apply</button>
          </form>

          <GeocoderControl
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            position="top-left"
          />
        </div>
      )}
    </>
  );
};

export default PlotsFilters;
