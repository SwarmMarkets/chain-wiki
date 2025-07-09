declare global {
  interface EthereumProvider {
    isMetaMask?: boolean
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
  }

  interface Window {
    ethereum?: EthereumProvider
  }
}

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}
