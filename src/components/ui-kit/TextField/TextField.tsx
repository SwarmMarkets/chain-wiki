import clsx from 'clsx'
import { ChangeEvent } from 'react'
import { fieldTypes } from './consts'
import { TextFieldProps, TextFieldTypes } from './types'

const TextField = <T extends TextFieldTypes>({
  type = 'text' as T,
  variant = 'outlined',
  size = 'md',
  align = 'left',
  StartAdornment,
  EndAdornment,
  errorMessage,
  hideError,
  onChange,
  value,
  inputProps,
  className,
  disabled,
  ...props
}: TextFieldProps<T>) => {
  const { format, transform, display } = fieldTypes[type]

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value as string
    const formattedValue = format ? format(input) : input
    const transformedValue = transform
      ? transform(formattedValue)
      : formattedValue
    onChange?.(transformedValue)
    inputProps?.onChange?.(e)
  }

  const handleBlur = () => {
    const formattedValue = format && value ? format(value) : value || ''

    if (transform) {
      onChange?.(transform(formattedValue))
    }
  }

  const sizeClasses = {
    sm: 'typo-label1',
    md: 'typo-label2',
    lg: 'typo-title3 font-medium',
  }

  const adornmentClasses = clsx({
    'pl-10': !!StartAdornment,
    'pr-10': !!EndAdornment,
  })

  const inputAlignClasses = clsx(align === 'right' && 'text-right')

  const baseClasses =
    'w-full outline-none placeholder:text-main text-main-accent px-2 py-2'

  const commonClass = clsx(sizeClasses[size], baseClasses, adornmentClasses, {
    'cursor-auto opacity-50 pointer-events-none': disabled,
  })

  const variantClasses = {
    outlined: clsx(
      commonClass,
      'border rounded',
      errorMessage
        ? 'border-error'
        : 'border-main hover:border-main-hover focus:border-main-active'
    ),
    text: commonClass,
  }

  const displayValue = display ? display(value || '') : (value as string)

  return (
    <div className={className} {...props}>
      <div className={clsx('relative flex items-center')}>
        {StartAdornment && (
          <span className='absolute left-3'>{StartAdornment}</span>
        )}

        <input
          {...inputProps}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={clsx(
            variantClasses[variant],
            inputAlignClasses,
            inputProps?.className
          )}
        />

        {EndAdornment && (
          <span className='absolute right-3'>{EndAdornment}</span>
        )}
      </div>
      {!hideError && (
        <span className='min-h-3 block leading-3 typo-label1 ml-3 text-error'>
          {errorMessage}
        </span>
      )}
    </div>
  )
}

export default TextField
