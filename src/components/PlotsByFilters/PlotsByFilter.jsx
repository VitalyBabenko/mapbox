import { useEffect } from 'react';
import { Layer, Source, useMap } from 'react-map-gl';
import { INITIAL_VIEW } from '../../constants';

const PlotsByFilter = ({ filterSearchPlots }) => {
  const { current: map } = useMap();

  useEffect(() => {
    if (filterSearchPlots.length) {
      map.flyTo({
        center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
        zoom: 13,
        essential: true,
      });
    }
  }, [filterSearchPlots]);

  if (!filterSearchPlots.length) return null;

  return (
    <Source id='plotsByFilters' type='vector' url='mapbox://lamapch.64ix47h1'>
      <Layer
        id='plots'
        type='fill'
        source-layer='CAD_PARCELLE_MENSU_WGS84-dor0ac'
        filter={['in', 'EGRID', ...filterSearchPlots]}
        paint={{
          'fill-color': '#ed0e2c',
          'fill-opacity': 0.6,
        }}
        beforeId='poi-label'
      />
    </Source>
  );
};

export default PlotsByFilter;
