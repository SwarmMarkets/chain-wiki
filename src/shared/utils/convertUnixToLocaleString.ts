export function convertUnixToLocaleString(
  unixTimestamp: string | number,
  locale: string = 'default',
  options: Intl.DateTimeFormatOptions = {}
): string {
  const timestamp = Number(unixTimestamp)
  const date = new Date(timestamp * 1000) // Convert Unix timestamp to milliseconds
  return date.toLocaleString(locale, options)
}
