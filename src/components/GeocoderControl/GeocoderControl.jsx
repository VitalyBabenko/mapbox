import { useState } from "react";
import { useControl, Marker } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

function GeocoderControl({
  mapboxAccessToken,
  marker: markerProp = true,
  position,
  onLoading = () => {},
  onResults = () => {},
  onResult = () => {},
  onError = () => {},
  proximity,
  render,
  language,
  zoom,
  flyTo,
  placeholder,
  countries,
  types,
  minLength,
  limit,
  filter,
  origin,
}) {
  const [marker, setMarker] = useState(null);

  const geocoder = useControl(
    () => {
      const ctrl = new MapboxGeocoder({
        marker: false,
        accessToken: mapboxAccessToken,
      });

      ctrl.on("loading", onLoading);
      ctrl.on("results", onResults);
      ctrl.on("result", (evt) => {
        onResult(evt);

        const { result } = evt;
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === "Point" && result.geometry.coordinates));
        if (location && markerProp) {
          setMarker(
            <Marker
              {...markerProp}
              longitude={location[0]}
              latitude={location[1]}
            />
          );
        } else {
          setMarker(null);
        }
      });
      ctrl.on("error", onError);
      return ctrl;
    },
    { position }
  );

  if (geocoder._map) {
    if (geocoder.getProximity() !== proximity && proximity !== undefined) {
      geocoder.setProximity(proximity);
    }
    if (geocoder.getRenderFunction() !== render && render !== undefined) {
      geocoder.setRenderFunction(render);
    }
    if (geocoder.getLanguage() !== language && language !== undefined) {
      geocoder.setLanguage(language);
    }
    if (geocoder.getZoom() !== zoom && zoom !== undefined) {
      geocoder.setZoom(zoom);
    }
    if (geocoder.getFlyTo() !== flyTo && flyTo !== undefined) {
      geocoder.setFlyTo(flyTo);
    }
    if (
      geocoder.getPlaceholder() !== placeholder &&
      placeholder !== undefined
    ) {
      geocoder.setPlaceholder(placeholder);
    }
    if (geocoder.getCountries() !== countries && countries !== undefined) {
      geocoder.setCountries(countries);
    }
    if (geocoder.getTypes() !== types && types !== undefined) {
      geocoder.setTypes(types);
    }
    if (geocoder.getMinLength() !== minLength && minLength !== undefined) {
      geocoder.setMinLength(minLength);
    }
    if (geocoder.getLimit() !== limit && limit !== undefined) {
      geocoder.setLimit(limit);
    }
    if (geocoder.getFilter() !== filter && filter !== undefined) {
      geocoder.setFilter(filter);
    }
    if (geocoder.getOrigin() !== origin && origin !== undefined) {
      geocoder.setOrigin(origin);
    }
  }

  return marker;
}

export default GeocoderControl;
