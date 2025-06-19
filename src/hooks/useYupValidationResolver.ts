/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react'
import { ObjectSchema } from 'yup'

interface Error {
  type: string
  message: string
  path: string
}

interface Errors {
  inner: Error[]
}

// Utility to convert a path like "headerLinks[0].title" into a nested structure
const setNestedError = (obj: any, path: string, value: any) => {
  const keys = path.replace(/\[(\d+)]/g, '.$1').split('.')
  keys.reduce((acc, key, index) => {
    if (index === keys.length - 1) {
      acc[key] = value
    } else {
      acc[key] = acc[key] || {}
    }
    return acc[key]
  }, obj)
}

const useYupValidationResolver = (validationSchema: ObjectSchema<any>) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (errors) {
        const formattedErrors = (errors as Errors).inner.reduce(
          (allErrors, currentError) => {
            setNestedError(allErrors, currentError.path, {
              type: currentError.type ?? 'validation',
              message: currentError.message,
            })
            return allErrors
          },
          {}
        )

        return {
          values: {},
          errors: formattedErrors,
        }
      }
    },
    [validationSchema]
  )

export default useYupValidationResolver
