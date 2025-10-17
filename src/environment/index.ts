const isDev = process.env.NEXT_PUBLIC_MODE === 'development'
const isProd = process.env.NEXT_PUBLIC_MODE === 'production'

export const environment = Object.freeze({
  isDevMode: isDev,
  isProdMode: isProd,
  thirdWebClientId: process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID as string,
  subgraphApiKey: process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY as string,
  subgraphDevApiKey: process.env.NEXT_PUBLIC_DEV_SUBGRAPH_API_KEY,
  girhubToken: process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN as string,
})
