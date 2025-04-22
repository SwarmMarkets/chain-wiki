import dayjs from 'dayjs'
import { SHORT_WEEKDAY_FORMAT } from 'src/common/consts/dateFormats'

export const weekdays = Array.from({ length: 7 }, (_, i) =>
  dayjs().day(i).format(SHORT_WEEKDAY_FORMAT)
)
