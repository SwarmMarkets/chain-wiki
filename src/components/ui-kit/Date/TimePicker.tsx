import React from 'react'
import Option from '../Select/Option'
import Select from '../Select/Select'
import { useTranslation } from 'react-i18next'

interface TimePickerProps {
  selectedHour: number
  selectedMinute: number
  onHourChange: (hour: number) => void
  onMinuteChange: (minute: number) => void
  minMinute?: number
  minHour?: number
  maxHour?: number
  maxMinute?: number
}

const TimePicker: React.FC<TimePickerProps> = ({
  selectedHour,
  selectedMinute,
  onHourChange,
  onMinuteChange,
  minHour,
  minMinute,
  maxHour,
  maxMinute,
}) => {
  const { t } = useTranslation('time')

  // Filter hours based on minHour and maxHour, if defined
  const filteredHours = Array.from({ length: 24 }, (_, i) => i).filter(hour => {
    return (
      (minHour === undefined || hour >= minHour) &&
      (maxHour === undefined || hour <= maxHour)
    )
  })

  // Filter minutes based on minMinute and maxMinute if the selected hour equals minHour or maxHour
  const filteredMinutes = Array.from({ length: 60 }, (_, i) => i).filter(
    minute => {
      return (
        (minMinute === undefined ||
          selectedHour !== minHour ||
          minute >= minMinute) &&
        (maxMinute === undefined ||
          selectedHour !== maxHour ||
          minute <= maxMinute)
      )
    }
  )

  return (
    <div className='flex items-center justify-between bg-paper w-full gap-3'>
      <div>
        <span className='block typo-body2 text-main'>{t('Hour')}</span>
        <Select<number>
          className='min-w-32'
          value={selectedHour}
          onChange={onHourChange}
          optionsClass='!max-h-56'
          position='top'
        >
          {filteredHours.map(hour => (
            <Option key={hour} value={hour}>
              {hour.toString().padStart(2, '0')}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <span className='block typo-body2 text-main'>{t('Minute')}</span>
        <Select
          className='min-w-32'
          value={selectedMinute}
          onChange={onMinuteChange}
          optionsClass='!max-h-56'
          position='top'
        >
          {filteredMinutes.map(minute => (
            <Option key={minute} value={minute}>
              {minute.toString().padStart(2, '0')}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  )
}

export default TimePicker
