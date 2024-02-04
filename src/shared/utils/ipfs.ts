import { IpfsProjectContent } from "../types/ipfs"

const generateIpfsProjectContent = (args: IpfsProjectContent) => {
  const content = {
    name: args.name,
    address: args.address,
    htmlContent: args.htmlContent,
  }

  return JSON.stringify(content)
}

const parseIpfsProjectContent = (content: string): IpfsProjectContent => {
  return JSON.parse(content)
}

export {
  generateIpfsProjectContent,
  parseIpfsProjectContent,
}