export const timeIdFormat = (date: Date): string => {
  const dateFormat: Date = new Date(date)

  const offset: number = dateFormat.getTimezoneOffset()

  let timeZone: string = ""

  switch (-offset) {
    case 420:
      timeZone = "WIB"
      break
    case 480:
      timeZone = "WITA"
      break
    case 540:
      timeZone = "WIT"
      break
    default:
      timeZone = "Waktu Lokal"
  }

  const idFormat: Intl.DateTimeFormat = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  })

  return `${idFormat.format(dateFormat)} ${timeZone}`
}
