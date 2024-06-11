import { BiStar as StarIcon, BiBell as BellIcon } from "react-icons/bi";
import { AiOutlineClose as CrossIcon } from "react-icons/ai";
import { memo, useEffect, useState } from "react";
import { service } from "../../service";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SpecsSection from "./SpecsSection/SpecsSection";
import style from "./PlotsPanel.module.scss";
import AddressesSection from "./AddressesSection/AddressesSection";
import OwnersSection from "./OwnersSection/OwnersSection";
import TransactionsSection from "./TransactionsSection/TransactionsSection";
import NotesSection from "./NotesSection/NotesSection";
import { convertTimeFormat } from "../../utils/convertTimeFormat";
import BuildingPermitsSection from "./BuildingPermitsSection/BuildingPermitsSection";
import { BiFileBlank as FileIcon } from "react-icons/bi";
import Tooltip from "../Tooltip/Tooltip";
import List from "../List/List";

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
      // console.log(info);
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

        <Tooltip text="Add plot to bookmarks alerts" bottom="-40px">
          <StarIcon className={style.star} />
        </Tooltip>

        <Tooltip text="Add plot to email alerts" bottom="-40px">
          <BellIcon />
        </Tooltip>

        {plotInfo?.extrait_rdppf_pdf && (
          <a
            className={style.fileLink}
            href={plotInfo.extrait_rdppf_pdf}
            target="_blank"
            rel="noreferrer"
          >
            <Tooltip text="RDPPF" bottom="-40px">
              <FileIcon />
            </Tooltip>
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

      <List title="Zone:" className={style.zone}>
        {plotInfo?.zone?.map((item) => (
          <li key={item} className={style.zoneItem}>
            {item}
          </li>
        ))}
      </List>

      <AddressesSection plotInfo={plotInfo} />

      <OwnersSection plotInfo={plotInfo} />

      <TransactionsSection plotInfo={plotInfo} />

      <BuildingPermitsSection plotInfo={plotInfo} />

      {plotInfo?.derniere_modification && (
        <p className={style.lastEdits}>
          Last edits:{" "}
          <b>{convertTimeFormat(plotInfo?.derniere_modification)}</b>
        </p>
      )}
    </div>
  );
};

export default memo(PlotsPanel);
