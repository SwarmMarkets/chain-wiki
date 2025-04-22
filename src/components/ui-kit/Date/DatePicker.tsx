import { Dayjs } from 'dayjs'
import React from 'react'
import OvalBadge from '../OvalBadge'
import clsx from 'clsx'
import Icon from '../Icon/Icon'
import IconButton from '../IconButton'
import { weekdays } from './consts'
import { MONTH_YEAR_FORMAT } from 'src/common/consts/dateFormats'

interface DatePickerProps {
  selectedDate: Dayjs
  onDateChange: (date: Dayjs) => void
  minDate?: Dayjs
  maxDate?: Dayjs
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  minDate,
  maxDate,
}) => {
  const daysInMonth = selectedDate.daysInMonth()
  const startDay = selectedDate.startOf('month').day()

  const handleDateClick = (day: number) => {
    const newDate = selectedDate.date(day)
    if (
      (minDate && newDate.isBefore(minDate, 'day')) ||
      (maxDate && newDate.isAfter(maxDate, 'day'))
    ) {
      return
    }
    onDateChange(newDate)
  }

  const renderDays = () => {
    const days = []

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className='w-8 h-8'></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = selectedDate.date(day)
      const isDisabled =
        (minDate && currentDate.isBefore(minDate, 'day')) ||
        (maxDate && currentDate.isAfter(maxDate, 'day'))

      const isActive = selectedDate.date() === day

      days.push(
        <OvalBadge
          key={day}
          className={clsx(
            'w-8 h-8 px-0 py-0 p-0 flex items-center justify-center rounded-full',
            isDisabled
              ? 'opacity-80 cursor-default border-none'
              : 'cursor-pointer'
          )}
          active={isActive}
          onClick={() => !isDisabled && handleDateClick(day)}
        >
          {day}
        </OvalBadge>
      )
    }
    return days
  }

  return (
    <div className='space-y-4 bg-paper'>
      <div className='flex justify-between items-center w-full mb-2'>
        <IconButton
          hoverBackground='secondary-accent'
          onClick={() => onDateChange(selectedDate.subtract(1, 'month'))}
        >
          <Icon size={20} name='arrow-left' color='primary' />
        </IconButton>
        <div className='typo-title2 text-main-accent'>
          {selectedDate.format(MONTH_YEAR_FORMAT)}
        </div>
        <IconButton
          hoverBackground='secondary-accent'
          onClick={() => onDateChange(selectedDate.add(1, 'month'))}
        >
          <Icon size={20} name='arrow-right' color='primary' />
        </IconButton>
      </div>

      <div className='grid gap-2 justify-center grid-cols-[repeat(7,_32px)]'>
        {weekdays.map(day => (
          <div key={day} className='typo-body2 text-main-accent text-center'>
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  )
}

export default DatePicker
