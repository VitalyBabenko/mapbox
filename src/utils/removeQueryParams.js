export function removeQueryParams(url) {
  try {
    const parsedUrl = new URL(url)
    parsedUrl.search = ''
    return parsedUrl.toString()
  } catch (error) {
    console.error('Invalid URL:', url)
    return url
  }
}
