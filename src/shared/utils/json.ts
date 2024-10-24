import { isObject } from './isObject'

export const verifyObjectKeys = <T extends object>(
  keys: string[],
  object: T = {} as T
) => {
  const isObjValid = keys.every(key => Object.keys(object).includes(key))
  if (!isObjValid) {
    throw Error('Keys does not satisfy Object keys')
  }
  return isObjValid
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyObjectKeysDeep = <T extends { [key: string]: any }>(
  validObject: T,
  checkObject: T
): boolean => {
  const validKeys = Object.keys(validObject).sort()

  for (let i = 0; i < validKeys.length; i++) {
    const key = validKeys[i]
    const validValue = validObject[key]
    const checkValue = checkObject[key]

    verifyObjectKeys(validKeys, checkObject)

    const areObjects = isObject(validValue) && isObject(checkValue)

    if (
      areObjects &&
      !verifyObjectKeysDeep(
        validValue as Record<string, unknown>,
        (checkValue as Record<string, unknown>) ||
          (!areObjects && validValue !== checkValue)
      )
    ) {
      throw Error('Object is invalid')
    }
  }

  return true
}
