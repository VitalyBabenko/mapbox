import { BiStar as StarIcon, BiBell as BellIcon } from "react-icons/bi";
import { AiOutlineClose as CrossIcon } from "react-icons/ai";
import { memo, useEffect, useState } from "react";
import { service } from "../../service";
import Loader from "../Loader/Loader";
import AddressesSection from "./AddressesSection/AddressesSection";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SpecsSection from "./SpecsSection/SpecsSection";
import style from "./PlotsPanel.module.scss";
import OwnersSection from "./OwnersSection/OwnersSection";
import TransactionSection from "./TransactionSection/TransactionSection";

const PlotsPanel = ({ plot, setPlot }) => {
  const [plotInfo, setPlotInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const closePlotPanel = () => setPlot(null);

  useEffect(() => {
    const getData = async () => {
      setError(null);
      setIsLoading(true);
      const info = await service.getPlotByEgrId(plot?.properties?.EGRID);
      info?.error?.message ? setError(info.error.message) : setPlotInfo(info);
      console.log(info);
      setIsLoading(false);
    };

    if (plot) getData();
  }, [plot]);

  const createNote = (e) => {
    e.preventDefault();
  };

  if (!plot) return null;

  if (error)
    return (
      <div className={style.panel}>
        <ErrorMessage
          message="Plot information is unavailable. Please try again later."
          onClose={() => setPlot(null)}
        />
      </div>
    );

  if (isLoading)
    return (
      <div className={style.panel}>
        <Loader />
      </div>
    );

  return (
    <div className={style.panel}>
      <div className={style.heading}>
        <h2>Plot {plotInfo?.no_commune_no_parcelle}</h2>
        <StarIcon className={style.star} />
        <BellIcon />
        <CrossIcon onClick={closePlotPanel} className={style.crossIcon} />
      </div>

      {plotInfo?.commune_name && (
        <p className={style.commune}>
          Commune: <span>{plotInfo.commune_name}</span>
        </p>
      )}

      <SpecsSection plotInfo={plotInfo} />

      <div className={style.divider}></div>

      <form onSubmit={createNote} className={style.notes}>
        <label>
          <h3>My notes</h3>
          <input />
        </label>
        <button>Send</button>
      </form>

      <div className={style.divider}></div>

      <div className={style.zone}>
        <h3>Zone</h3>

        <ul>
          {plotInfo?.zone?.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>

      <div className={style.divider}></div>

      <AddressesSection
        addresses={plotInfo?.addresses}
        isPpe={plotInfo?.ppe}
        isConstructionCerts={!!plotInfo?.construction_certs?.length}
      />

      <OwnersSection ownershipInfo={plotInfo?.ownership_info} />

      <TransactionSection ownershipInfo={plotInfo?.ownership_info} />

      {/* {plotInfo?.derniere_modification && (
        <span className={style.lastEdits}>
          {plotInfo.derniere_modification}
        </span>
      )} */}
    </div>
  );
};

export default memo(PlotsPanel);
