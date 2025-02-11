export function fromUnixTimestamp(unixTimestamp: string | number): Date {
  const timestamp = Number(unixTimestamp)
  const date = new Date(timestamp * 1000) // Convert Unix timestamp to milliseconds
  return date
}

export function convertUnixToLocaleString(
  unixTimestamp: string | number,
  locale = 'default',
  options: Intl.DateTimeFormatOptions = {}
): string {
  const date = fromUnixTimestamp(unixTimestamp)
  return date.toLocaleString(locale, options)
}
