import { BiStar as StarIcon, BiBell as BellIcon } from "react-icons/bi";
import { AiOutlineClose as CrossIcon } from "react-icons/ai";
import { memo, useEffect, useState } from "react";
import { service } from "../../service";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SpecsSection from "./SpecsSection/SpecsSection";
import style from "./PlotsPanel.module.scss";
import AddressesSection from "./AddressesSection/AddressesSection";
import ZoneSection from "./ZoneSection/ZoneSection";
import OwnersSection from "./OwnersSection/OwnersSection";
import TransactionsSection from "./TransactionsSection/TransactionsSection";
import NotesSection from "./NotesSection/NotesSection";
import { convertTimeFormat } from "../../utils/convertTimeFormat";
import BuildingPermitsSection from "./BuildingPermitsSection/BuildingPermitsSection";
import { BiFileBlank as FileIcon } from "react-icons/bi";

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

        {plotInfo?.extrait_rdppf_pdf && (
          <a
            className={style.fileLink}
            href={plotInfo.extrait_rdppf_pdf}
            target="_blank"
            rel="noreferrer"
          >
            <FileIcon />

            <p className={style.fileTooltip}>RDPPF</p>
          </a>
        )}

        <CrossIcon onClick={closePlotPanel} className={style.crossIcon} />
      </div>

      {plotInfo?.commune_name && (
        <p className={style.commune}>
          Commune: <span>{plotInfo.commune_name}</span>
        </p>
      )}

      <SpecsSection plotInfo={plotInfo} />

      <NotesSection plotInfo={plotInfo} />

      <ZoneSection plotInfo={plotInfo} />

      <AddressesSection plotInfo={plotInfo} />

      <OwnersSection plotInfo={plotInfo} />

      <TransactionsSection plotInfo={plotInfo} />

      <BuildingPermitsSection plotInfo={plotInfo} />

      {plotInfo?.derniere_modification && (
        <p className={style.lastEdits}>
          Last edits: {convertTimeFormat(plotInfo?.derniere_modification)}
        </p>
      )}
    </div>
  );
};

export default memo(PlotsPanel);
