import { useLocale } from '../../../../hooks'
import style from './LinksSection.module.scss'
import { BiFileBlank as FileIcon } from 'react-icons/bi'
import { TbMapPin2 as PlotIcon } from 'react-icons/tb'

const LinksSection = ({ landRegistryUrl, rdppfUrl }) => {
  const { t } = useLocale('panels.plots')

  return (
    <div className={style.links}>
      {landRegistryUrl && (
        <a
          className={style.link}
          href={landRegistryUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <PlotIcon />
          {t('landRegistry')}
        </a>
      )}

      {rdppfUrl && (
        <a
          className={style.link}
          href={rdppfUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <FileIcon />
          {t('RDPPF')}
        </a>
      )}
    </div>
  )
}

export default LinksSection
