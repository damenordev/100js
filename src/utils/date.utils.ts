export const formatDateToMonthYear = (date: Date) => date.toLocaleString('default', { month: 'long', year: 'numeric' })

export const formatDatFullDate = (date: Date) => {
  return Intl.DateTimeFormat('es-ES', { month: 'short', day: '2-digit', year: 'numeric' }).format(date)
}

export const formatDateRange = (startDate: Date, endDate?: Date | string): string => {
  const start = formatDateToMonthYear(startDate)
  let end = ''
  if (endDate) end = typeof endDate === 'string' ? endDate : formatDateToMonthYear(endDate)
  return `${start} - ${end}`
}

export const readingTime = (html: string) => {
  const textOnly = html.replace(/<[^>]+>/g, '')
  const wordCount = textOnly.split(/\s+/).length
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed()
  return `${readingTimeMinutes} min`
}
