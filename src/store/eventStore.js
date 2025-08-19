import { create } from 'zustand'

export const useEventStore = create(set => ({
  clickEvent: null,
  setClickEvent: clickEvent => set({ clickEvent }),

  clickedFeature: null,
  setClickedFeature: clickedFeature => set({ clickedFeature }),

  hoverEvent: null,
  setHoverEvent: hoverEvent => set({ hoverEvent }),

  hoveredFeature: null,
  setHoveredFeature: hoveredFeature => set({ hoveredFeature }),

  clickedPlotInfo: null,
  setClickedPlotInfo: clickedPlotInfo => set({ clickedPlotInfo }),

  renderedFeatures: [],
  setRenderedFeatures: renderedFeatures => set({ renderedFeatures }),

  renderedFeaturesLoading: false,
  setRenderedFeaturesLoading: renderedFeaturesLoading =>
    set({ renderedFeaturesLoading }),
}))
