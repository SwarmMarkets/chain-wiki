import * as yup from 'yup'

declare module 'yup' {
  interface StringSchema {
    isEthereumAddress(message?: string): StringSchema
    isENSName(message?: string): StringSchema
  }
}

yup.addMethod<yup.StringSchema>(
  yup.string,
  'isEthereumAddress',
  function (message = 'Invalid Ethereum address') {
    return this.test('is-ethereum-address', message, function (value) {
      if (!value) return true
      const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/
      return ethereumAddressRegex.test(value)
    })
  }
)

yup.addMethod<yup.StringSchema>(
  yup.string,
  'isENSName',
  function (message = 'Invalid ENS name') {
    return this.test('is-ens-name', message, function (value) {
      if (!value) return true
      // ENS name should have at least one label and end with `.eth`
      const ensRegex = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63})*\.eth$/i
      return ensRegex.test(value)
    })
  }
)

export default yup
