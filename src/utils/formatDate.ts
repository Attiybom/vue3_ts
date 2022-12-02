import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

//扩展utc
dayjs.extend(utc)

export function formatDate(
  dateString: string,
  format: string = 'YYYY-MM-DD HH:mm:ss'
) {
  return dayjs(dateString).utc().utcOffset(8).format(format)
}
