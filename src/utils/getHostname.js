export const getHostname = () => {
  if (window.location.hostname === 'localhost') {
    return 'https://panel.lamap.ch'
  }

  return window.location.origin
}
