import { BiLinkExternal as LinkIcon } from "react-icons/bi";
import style from "./BuildingPermitsSection.module.scss";

// building with construction_certs: Route de malagnou 17

const BuildingPermitsSection = ({ plotInfo }) => {
  const certificates = plotInfo?.construction_certs || [];

  if (!certificates.length) return null;
  return (
    <section className={style.section}>
      <h3>Building permits</h3>

      <ul className={style.list}>
        {certificates.map((cert, i) => (
          <li key={cert?.id || i}>
            <div className={style.heading}>
              <h4>File: {cert?.id}</h4>

              <a target="_blank" href={cert?.url} rel="noreferrer">
                <LinkIcon />
                <p className={style.tooltip}>
                  Full details on the government's website
                </p>
              </a>
            </div>

            {cert?.statut_dossier && (
              <p>
                Status: <span>{cert?.statut_dossier}</span>
              </p>
            )}

            <p>
              Active:
              {cert?.depose_le && (
                <>
                  {" "}
                  from <span>{cert?.depose_le}</span>
                </>
              )}
              {cert?.decide_le && (
                <>
                  {" "}
                  to <span>{cert?.decide_le}</span>
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BuildingPermitsSection;
