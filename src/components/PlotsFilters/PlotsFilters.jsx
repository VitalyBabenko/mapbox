import { useState } from "react";
import { selectStyles } from "../../styles/selectStyles";
import style from "./PlotsFilters.module.scss";

import { IoFilter as FilterIcon } from "react-icons/io5";
import { AiOutlineClose as CrossIcon } from "react-icons/ai";
import GeocoderControl from "../GeocoderControl/GeocoderControl";
import Checkbox from "../Checkbox/Checkbox";
import Select from "react-select";
import { FILTERS_OPTIONS } from "../../constants/index.js";

const PlotsFilters = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const [isSAD, setIsSAD] = useState(false);
  const [isPPE, setIsPPE] = useState(false);
  const [canton, setCanton] = useState("");
  const [postCode, setPostCode] = useState("");
  const [locality, setLocality] = useState("");
  const [request, setRequest] = useState(null);
  const [fileNumber, setFileNumber] = useState("");
  const [fileStatus, setFileStatus] = useState("");
  const [commune, setCommune] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
              <Checkbox
                label="SAD"
                checked={isSAD}
                onChange={() => setIsSAD(!isSAD)}
              />

              <Checkbox
                label="PPE"
                checked={isPPE}
                onChange={() => setIsPPE(!isPPE)}
              />
            </div>
            <h3>Canton</h3>
            <Select
              name="canton"
              className={style.select}
              styles={selectStyles}
              options={FILTERS_OPTIONS.CANTON}
            />

            <h3>Post code</h3>
            <Select
              name="postCode"
              isMulti
              options={FILTERS_OPTIONS.POST_CODE}
              styles={selectStyles}
            />

            <h3>Locality</h3>
            <Select
              name="locality"
              isMulti
              options={FILTERS_OPTIONS.LOCALITY}
              styles={selectStyles}
            />

            <h3>Request Submitted On</h3>
            <div className={style.requestSubmittedOn}>
              <input />
              <input />
            </div>

            <h3>File Number</h3>
            <input />

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
