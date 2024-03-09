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
        return {
          values: {},
          errors: (errors as Errors).inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema]
  )

export default useYupValidationResolver
