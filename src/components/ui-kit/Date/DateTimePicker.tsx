import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'
import clsx from 'clsx'
import Button from '../Button/Button'

export interface DateTimePickerProps {
  initialDate?: Dayjs
  onDateChange?: (date: Dayjs) => void
  minDate?: Dayjs
  maxDate?: Dayjs
  className?: string
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  initialDate,
  onDateChange,
  minDate,
  maxDate,
  className,
}) => {
  const { t } = useTranslation('buttonCaptions')

  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs>(
    initialDate || dayjs()
  )

  const handleDateChange = (date: Dayjs) => {
    setSelectedDateTime(prevDateTime =>
      date.hour(prevDateTime.hour()).minute(prevDateTime.minute())
    )
  }

  const handleHourChange = (hour: number) => {
    setSelectedDateTime(prevDateTime => prevDateTime.hour(hour))
  }

  const handleMinuteChange = (minute: number) => {
    setSelectedDateTime(prevDateTime => prevDateTime.minute(minute))
  }

  const minHour =
    minDate && selectedDateTime.isSame(minDate, 'day')
      ? minDate.hour()
      : undefined
  const minMinute =
    minDate &&
    selectedDateTime.isSame(minDate, 'day') &&
    selectedDateTime.hour() === minDate.hour()
      ? minDate.minute()
      : undefined
  const maxHour =
    maxDate && selectedDateTime.isSame(maxDate, 'day')
      ? maxDate.hour()
      : undefined
  const maxMinute =
    maxDate &&
    selectedDateTime.isSame(maxDate, 'day') &&
    selectedDateTime.hour() === maxDate.hour()
      ? maxDate.minute()
      : undefined

  return (
    <div
      className={clsx(
        'flex flex-col items-center p-4 max-w-xs space-y-4 paper',
        className
      )}
    >
      <DatePicker
        selectedDate={selectedDateTime}
        onDateChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
      />
      <TimePicker
        selectedHour={selectedDateTime.hour()}
        selectedMinute={selectedDateTime.minute()}
        onHourChange={handleHourChange}
        onMinuteChange={handleMinuteChange}
        minHour={minHour}
        minMinute={minMinute}
        maxHour={maxHour}
        maxMinute={maxMinute}
      />
      <Button
        className='w-full'
        onClick={() => onDateChange?.(selectedDateTime)}
      >
        {t('Apply')}
      </Button>
    </div>
  )
}

export default DateTimePicker
