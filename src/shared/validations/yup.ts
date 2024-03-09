import * as yup from 'yup'

declare module 'yup' {
  interface StringSchema {
    isEthereumAddress(message?: string): StringSchema
  }
}

yup.addMethod<yup.StringSchema>(
  yup.string,
  'isEthereumAddress',
  function (message) {
    return this.test('is-ethereum-address', message, function (value) {
      if (value === undefined || value === null || value === '') {
        return true
      }
      const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/
      return ethereumAddressRegex.test(value)
    })
  }
)

export default yup
